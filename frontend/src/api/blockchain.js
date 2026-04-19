import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ABI = [
  "function publishNews(string contentHash) returns (uint256)",
  "function updateNews(uint256 originalId, string newHash) returns (uint256)",
  "event ArticlePublished(uint256 indexed id, address indexed publisher)",
  "event ArticleUpdated(uint256 indexed originalId, uint256 indexed newId, address indexed publisher)"
];

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found");
  
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
};

export const publishOnChain = async (contentHash) => {
  const contract = await getContract();
  const tx = await contract.publishNews(contentHash);
  const receipt = await tx.wait();
  
  let articleId = null;
  for (const log of receipt.logs) {
    try {
      const parsed = contract.interface.parseLog(log);
      if (parsed.name === "ArticlePublished") {
        articleId = Number(parsed.args.id);
      }
    } catch (e) {}
  }
  return { txHash: tx.hash, articleId };
};

export const updateOnChain = async (id, newHash) => {
  const contract = await getContract();
  const tx = await contract.updateNews(id, newHash);
  const receipt = await tx.wait();
  
  let newId = null;
  for (const log of receipt.logs) {
    try {
      const parsed = contract.interface.parseLog(log);
      if (parsed.name === "ArticleUpdated") {
        newId = Number(parsed.args.newId);
      }
    } catch (e) {}
  }
  return { txHash: tx.hash, id: newId };
};
