import { useState } from "react";
import { savePublishedContent } from "../api";
import { publishOnChain } from "../api/blockchain";
import { ethers } from "ethers";

function PublishArticle() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!content) return;
    setLoading(true);

    try {
      // 1. Generate the hash locally (SHA-256)
      const hash = ethers.sha256(ethers.toUtf8Bytes(content));

      // 2. Publish to blockchain via MetaMask
      const { articleId } = await publishOnChain(hash);

      // 3. Save the text to our backend
      await savePublishedContent(articleId, content);

      alert("Article Published! ID: " + articleId);
      setContent("");
    } catch (err) {
      console.error(err);
      alert("Error publishing article: " + (err.reason || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Enter article content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handlePublish} disabled={loading}>
        {loading ? "Confirming in MetaMask..." : "Publish"}
      </button>
    </div>
  );
}

export default PublishArticle;