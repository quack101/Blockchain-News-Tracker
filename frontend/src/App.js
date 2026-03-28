import PublishArticle from "./pages/PublishArticle";
import UpdateArticle from "./pages/UpdateArticle";
import ViewArticle from "./pages/ViewArticle";
import ViewHistory from "./pages/ViewHistory";
import "./App.css";

function App() {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Blockchain News Tracker</h1>

      <section>
        <h2>Publish</h2>
        <PublishArticle />
      </section>

      <hr />

      <section>
        <h2>Update</h2>
        <UpdateArticle />
      </section>

      <hr />

      <section>
        <h2>View Article</h2>
        <ViewArticle />
      </section>

      <hr />

      <section>
        <h2>View History</h2>
        <ViewHistory />
      </section>
    </div>
  );
}

export default App;