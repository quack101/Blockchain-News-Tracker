// const { ethers } = require("ethers");
// require("dotenv").config();

// const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// const abi = [
//   "function publishNews(string contentHash) returns (uint256)",
//   "function updateNews(uint256 originalId, string newHash) returns (uint256)",
//   "function getHistory(uint256 id) view returns (tuple(uint256 id,address publisher,uint256 timestamp,string contentHash,uint256 prevVersionId)[])",
//   "event ArticlePublished(uint256 indexed id, address indexed publisher)",
//   "event ArticleUpdated(uint256 indexed originalId,uint256 indexed newId,address indexed publisher)"
// ];

// const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

// // ✅ Publish
// async function publishNews(hash) {
//   const tx = await contract.publishNews(hash);
//   const receipt = await tx.wait();

//   let articleId = null;

//   for (const log of receipt.logs) {
//     try {
//       const parsed = contract.interface.parseLog(log);
//       if (parsed.name === "ArticlePublished") {
//         articleId = Number(parsed.args.id);
//       }
//     } catch {}
//   }

//   return { txHash: tx.hash, articleId };
// }

// // ✅ Update
// async function updateNews(id, hash) {
//   const tx = await contract.updateNews(id, hash);
//   const receipt = await tx.wait();

//   let newId = null;

//   for (const log of receipt.logs) {
//     try {
//       const parsed = contract.interface.parseLog(log);
//       if (parsed.name === "ArticleUpdated") {
//         newId = Number(parsed.args.newId);
//       }
//     } catch {}
//   }

//   return { txHash: tx.hash, id: newId };
// }

// // ✅ History
// async function getHistory(id) {
//   return await contract.getHistory(id);
// }

// module.exports = { publishNews, updateNews, getHistory };

const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const abi = [
  "function publishNews(string contentHash) returns (uint256)",
  "function updateNews(uint256 originalId, string newHash) returns (uint256)",
  "function getArticle(uint256 id) view returns (tuple(uint256 id,address publisher,uint256 timestamp,string contentHash,uint256 prevVersionId))",
  "function getHistory(uint256 id) view returns (tuple(uint256 id,address publisher,uint256 timestamp,string contentHash,uint256 prevVersionId)[])",
  "event ArticlePublished(uint256 indexed id, address indexed publisher)",
  "event ArticleUpdated(uint256 indexed originalId,uint256 indexed newId,address indexed publisher)"
];

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

// ✅ Publish
async function publishNews(hash) {
  const tx = await contract.publishNews(hash);
  const receipt = await tx.wait();

  let articleId = null;

  for (const log of receipt.logs) {
    try {
      const parsed = contract.interface.parseLog(log);
      if (parsed.name === "ArticlePublished") {
        articleId = Number(parsed.args.id);
      }
    } catch {}
  }

  return { txHash: tx.hash, articleId };
}

// ✅ Update
async function updateNews(id, hash) {
  const tx = await contract.updateNews(id, hash);
  const receipt = await tx.wait();

  let newId = null;

  for (const log of receipt.logs) {
    try {
      const parsed = contract.interface.parseLog(log);
      if (parsed.name === "ArticleUpdated") {
        newId = Number(parsed.args.newId);
      }
    } catch {}
  }

  return { txHash: tx.hash, id: newId };
}

// ✅ Get Article (FIXED BigInt)
async function getArticle(id) {
  const article = await contract.getArticle(id);

  return {
    id: Number(article.id),
    publisher: article.publisher,
    timestamp: Number(article.timestamp),
    contentHash: article.contentHash,
    prevVersionId: Number(article.prevVersionId),
  };
}

// ✅ Get History (FIXED BigInt)
async function getHistory(id) {
  const history = await contract.getHistory(id);

  return history.map((article) => ({
    id: Number(article.id),
    publisher: article.publisher,
    timestamp: Number(article.timestamp),
    contentHash: article.contentHash,
    prevVersionId: Number(article.prevVersionId),
  }));
}

module.exports = { publishNews, updateNews, getArticle, getHistory };