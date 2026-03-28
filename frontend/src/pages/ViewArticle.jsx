import { useState } from "react";
import { getArticle } from "../api";

function ViewArticle() {
  const [id, setId] = useState("");
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchArticle = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const res = await getArticle(id);
      setArticle(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching article");
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        placeholder="Enter Article ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button onClick={fetchArticle} disabled={!id}>
        Fetch
      </button>

      {loading && <p>Loading...</p>}

      {!loading && article && (
        <div
          style={{
            marginTop: "15px",
            border: "1px solid #38bdf8",
            padding: "15px",
            borderRadius: "10px",
            background: "#1e293b"
          }}
        >
          <p>🔗 Publisher: {article.author}</p>
          <p>⏱ Published: {article.timestamp}</p>
          <hr />
          <p>{article.content}</p>
        </div>
      )}

      {!loading && !article && <p>No article loaded</p>}
    </div>
  );
}

export default ViewArticle;