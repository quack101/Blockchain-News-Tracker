import { useState } from "react";
import { saveUpdatedContent } from "../api";
import { updateOnChain } from "../api/blockchain";
import { ethers } from "ethers";

function UpdateArticle() {
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!id || !content) return;
    setLoading(true);

    try {
      // 1. Generate new hash (SHA-256)
      const hash = ethers.sha256(ethers.toUtf8Bytes(content));

      // 2. Perform on-chain update via MetaMask
      const { id: newId } = await updateOnChain(Number(id), hash);

      // 3. Save updated text to backend
      await saveUpdatedContent(newId, content);

      alert("Article Updated! New Version ID: " + newId);
      setId("");
      setContent("");
    } catch (err) {
      console.error(err);
      alert("Error updating article: " + (err.reason || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        placeholder="Article ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <textarea
        placeholder="New content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleUpdate} disabled={loading}>
        {loading ? "Confirming in MetaMask..." : "Update"}
      </button>
    </div>
  );
}

export default UpdateArticle;