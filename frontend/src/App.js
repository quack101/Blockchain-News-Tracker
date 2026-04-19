import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import PublishArticle from "./pages/PublishArticle";
import UpdateArticle from "./pages/UpdateArticle";
import ViewArticle from "./pages/ViewArticle";
import ViewHistory from "./pages/ViewHistory";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("discover");

  return (
    <div className="dashboard-container">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Blockchain News Registry</h1>
        <WalletConnect />
      </header>

      <div className="hero-section">
        <p className="hero-text">
          The rapid spread of misinformation is primarily caused by the lack of accountability and traceability in digital news publishing. 
          This registry uses blockchain technology to ensure <span className="highlight">immutable tracking of news origin and modification history</span>. 
          <br /><br />
          Fake news is a trust and accountability problem, not only a content problem. We shift the focus from 
          <span className="highlight"> "What is said" to "Who said it and how responsibly"</span>, enabling transparency without enforcing subjective content moderation or censorship.
        </p>
      </div>

      <div className="tabs-container">
        <button 
          className={`tab-btn ${activeTab === 'discover' ? 'active' : ''}`}
          onClick={() => setActiveTab('discover')}
        >
          Verify & Trace
        </button>
        <button 
          className={`tab-btn ${activeTab === 'publish' ? 'active' : ''}`}
          onClick={() => setActiveTab('publish')}
        >
          Publish & Update
        </button>
      </div>

      {activeTab === 'discover' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '20px' }}>
          <section>
            <h2>Verify Article Origin</h2>
            <p style={{color: '#94a3b8', fontSize: '14px', marginBottom: '15px'}}>Enter an ID to verify its original publisher, timestamp, and immutable hash.</p>
            <ViewArticle />
          </section>
          <section>
            <h2>Trace Modification History</h2>
            <p style={{color: '#94a3b8', fontSize: '14px', marginBottom: '15px'}}>Review the complete cryptographic trail of revisions to eliminate silent rewrites.</p>
            <ViewHistory />
          </section>
        </div>
      )}

      {activeTab === 'publish' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '20px' }}>
          <section>
            <h2>Publish New Article</h2>
            <p style={{color: '#94a3b8', fontSize: '14px', marginBottom: '15px'}}>Your wallet address and the article's hash will be permanently anchored to the blockchain, establishing your accountability as the author.</p>
            <PublishArticle />
          </section>
          <section>
            <h2>Update Existing Article</h2>
            <p style={{color: '#94a3b8', fontSize: '14px', marginBottom: '15px'}}>Submit a revision. The previous version remains cryptographically verifiable forever.</p>
            <UpdateArticle />
          </section>
        </div>
      )}

    </div>
  );
}

export default App;