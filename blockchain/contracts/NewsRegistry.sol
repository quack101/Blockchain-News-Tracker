// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NewsRegistry {

    // ─── Data Structure ───────────────────────────────────────────────

    struct Article {
        uint256 id;
        address publisher;
        uint256 timestamp;
        string  contentHash;
        uint256 prevVersionId;  // 0 = original, else points to previous version
    }

    // ─── Storage ──────────────────────────────────────────────────────

    uint256 private articleCount;
    mapping(uint256 => Article)   private articles;
    mapping(uint256 => uint256[]) private versionChain; // originalId => [v1, v2, v3...]

    // ─── Events ───────────────────────────────────────────────────────

    event ArticlePublished(uint256 indexed id, address indexed publisher);
    event ArticleUpdated(uint256 indexed originalId, uint256 indexed newId, address indexed publisher);

    // ─── Functions ────────────────────────────────────────────────────

    /**
     * @notice Publish a new article.
     * @param contentHash SHA-256 hash of the article content (generated off-chain by backend)
     * @return id of the newly created article
     */
    function publishNews(string memory contentHash) external returns (uint256) {
        require(bytes(contentHash).length > 0, "Hash cannot be empty");

        articleCount++;

        articles[articleCount] = Article({
            id:            articleCount,
            publisher:     msg.sender,
            timestamp:     block.timestamp,
            contentHash:   contentHash,
            prevVersionId: 0
        });

        versionChain[articleCount].push(articleCount);

        emit ArticlePublished(articleCount, msg.sender);
        return articleCount;
    }

    /**
     * @notice Update an existing article. Appends a new version, never overwrites.
     * @param originalId The ID of the original (root) article
     * @param newHash SHA-256 hash of the updated content
     * @return id of the newly created version
     */
    function updateNews(uint256 originalId, string memory newHash) external returns (uint256) {
        require(articles[originalId].id != 0,                          "Article not found");
        require(articles[originalId].publisher == msg.sender,          "Not the original publisher");
        require(bytes(newHash).length > 0,                             "Hash cannot be empty");

        articleCount++;

        articles[articleCount] = Article({
            id:            articleCount,
            publisher:     msg.sender,
            timestamp:     block.timestamp,
            contentHash:   newHash,
            prevVersionId: originalId
        });

        versionChain[originalId].push(articleCount);

        emit ArticleUpdated(originalId, articleCount, msg.sender);
        return articleCount;
    }

    /**
     * @notice Fetch a single article by its ID.
     * @param id Article ID
     * @return Article struct
     */
    function getArticle(uint256 id) external view returns (Article memory) {
        require(articles[id].id != 0, "Article not found");
        return articles[id];
    }

    /**
     * @notice Fetch the full version history of an article.
     * @param originalId The root article ID
     * @return Array of Article structs in chronological order
     */
    function getHistory(uint256 originalId) external view returns (Article[] memory) {
        require(articles[originalId].id != 0, "Article not found");

        uint256[] memory ids = versionChain[originalId];
        Article[] memory history = new Article[](ids.length);

        for (uint256 i = 0; i < ids.length; i++) {
            history[i] = articles[ids[i]];
        }

        return history;
    }

    /**
     * @notice Returns the total number of articles/versions ever created.
     */
    function getArticleCount() external view returns (uint256) {
        return articleCount;
    }
}