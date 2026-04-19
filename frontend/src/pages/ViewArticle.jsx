import { useState } from "react";
import { getArticle } from "../api";
import ArticleCard from "../components/ArticleCard";

function ViewArticle() {
  const [id, setId] = useState("");
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchArticle = async () => {
    if (!id) return;

    setLoading(true);
    setError("");
    setArticle(null);

    try {
      const res = await getArticle(id);
      setArticle(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not fetch article. Please check the ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        placeholder="Enter Article ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button onClick={fetchArticle} disabled={!id || loading}>
        {loading ? "Loading..." : "View"}
      </button>

      {error && (
        <p style={{ color: "#ef4444", marginTop: "10px" }}>{error}</p>
      )}

      {article && <ArticleCard article={article} />}

      {!article && !loading && !error && (
        <p style={{ color: "#94a3b8", marginTop: "10px" }}>
          Enter an article ID and click View to fetch it from the blockchain.
        </p>
      )}
    </div>
  );
}

export default ViewArticle;