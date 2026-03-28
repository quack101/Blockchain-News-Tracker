import { useState } from "react";
import { updateArticle } from "../api";

function UpdateArticle() {
  const [id, setId] = useState("");
  const [content, setContent] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateArticle({ id, content });
    alert("Article Updated (mock)");
    setId("");
    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Article ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <br />
        <textarea
          placeholder="New content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateArticle;