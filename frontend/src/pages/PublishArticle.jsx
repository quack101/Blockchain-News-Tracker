import { useState } from "react";
import { publishArticle } from "../api";

function PublishArticle() {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await publishArticle({ content });
    alert("Article Published (mock)");
    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter article content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default PublishArticle;