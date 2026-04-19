function ArticleCard({ article }) {
  if (!article) return null;

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="article-card" style={styles.card}>
      <div style={styles.header}>
        <span style={styles.badge}>Article #{article.id}</span>
        {article.versionNumber && (
          <span style={{ ...styles.badge, background: "rgba(34, 197, 94, 0.2)", color: "#4ade80", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
            Version {article.versionNumber} (Latest)
          </span>
        )}
        {article.prevVersionId > 0 && !article.versionNumber && (
          <span style={styles.updateBadge}>
            Revision of #{article.prevVersionId}
          </span>
        )}
      </div>


      <div style={styles.detailsGrid}>
        <div style={styles.detailCard}>
          <div style={styles.iconBox}>👤</div>
          <div>
            <span style={styles.label}>Verified Publisher</span>
            <span style={styles.valueHighlight}>{article.publisher || "N/A"}</span>
          </div>
        </div>

        <div style={styles.detailCard}>
          <div style={styles.iconBox}>🕐</div>
          <div>
            <span style={styles.label}>Immutable Timestamp</span>
            <span style={styles.value}>{formatDate(article.timestamp)}</span>
          </div>
        </div>

        <div style={{ ...styles.detailCard, gridColumn: "1 / -1" }}>
          <div style={styles.iconBox}>🔗</div>
          <div>
            <span style={styles.label}>Cryptographic Hash (SHA-256)</span>
            <span style={styles.hashValue}>
              {article.contentHash ? article.contentHash : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {article.content && (
        <div style={styles.contentBox}>
          <p style={styles.contentLabel}>📄 Full Content</p>
          <p style={styles.contentText}>{article.content}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "rgba(15, 23, 42, 0.7)",
    border: "1px solid rgba(56, 189, 248, 0.3)",
    borderRadius: "12px",
    padding: "24px",
    marginTop: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },
  badge: {
    background: "rgba(56, 189, 248, 0.2)",
    color: "#38bdf8",
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "14px",
    border: "1px solid rgba(56, 189, 248, 0.3)",
  },
  updateBadge: {
    background: "rgba(245, 158, 11, 0.2)",
    color: "#fca5a5",
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "14px",
    border: "1px solid rgba(245, 158, 11, 0.3)",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "20px",
  },
  detailCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(30, 41, 59, 0.5)",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  iconBox: {
    fontSize: "24px",
    background: "rgba(15, 23, 42, 0.8)",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
  },
  label: {
    display: "block",
    color: "#94a3b8",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "4px",
  },
  valueHighlight: {
    display: "block",
    color: "#38bdf8",
    fontSize: "13px",
    fontWeight: "600",
    fontFamily: "monospace",
    wordBreak: "break-all",
  },
  value: {
    display: "block",
    color: "#e2e8f0",
    fontSize: "14px",
    fontWeight: "500",
  },
  hashValue: {
    display: "block",
    color: "#a78bfa",
    fontSize: "13px",
    fontFamily: "monospace",
    wordBreak: "break-all",
  },
  contentBox: {
    background: "rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "8px",
    padding: "20px",
  },
  contentLabel: {
    color: "#94a3b8",
    fontSize: "13px",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: "600",
  },
  contentText: {
    color: "#f8fafc",
    lineHeight: "1.7",
    margin: 0,
    fontSize: "1.05rem",
  },
};

export default ArticleCard;
