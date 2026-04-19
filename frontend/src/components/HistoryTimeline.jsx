function HistoryTimeline({ historyData }) {
  return (
    <div style={styles.container}>
      <div style={styles.headerBox}>
        <h3 style={styles.title}>Immutable Audit Trail</h3>
        <p style={styles.subtitle}>Trace every modification back to its origin. All hashes are verifiable on-chain.</p>
      </div>

      {historyData.length === 0 && <p style={{ color: "#94a3b8" }}>No history found</p>}

      <div style={styles.timeline}>
        {historyData.map((item, index) => {
          const isLatest = index === historyData.length - 1;
          return (
            <div key={index} style={styles.node}>
              <div style={styles.line}></div>
              <div style={{...styles.circle, background: isLatest ? "#38bdf8" : "#475569"}}></div>
              
              <div style={{...styles.card, border: isLatest ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)"}}>
                <div style={styles.cardHeader}>
                  <span style={styles.versionBadge}>Version {index + 1} {isLatest && "(Current)"}</span>
                  <span style={styles.timeStr}>
                    {item.timestamp ? new Date(item.timestamp * 1000).toLocaleString() : "N/A"}
                  </span>
                </div>
                
                <div style={styles.hashSection}>
                  <span style={styles.hashLabel}>Cryptographic Hash:</span>
                  <span style={styles.hashValue}>{item.contentHash || item.hash || "N/A"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "rgba(15, 23, 42, 0.5)",
    padding: "25px",
    borderRadius: "12px",
    marginTop: "20px",
    border: "1px solid rgba(255,255,255,0.05)"
  },
  headerBox: {
    marginBottom: "30px",
    paddingBottom: "15px",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },
  title: {
    color: "#38bdf8",
    fontSize: "1.4rem",
    marginBottom: "5px",
    marginTop: "0"
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: "0.95rem",
    margin: 0
  },
  timeline: {
    position: "relative",
    paddingLeft: "20px"
  },
  node: {
    position: "relative",
    marginBottom: "30px",
    paddingLeft: "30px"
  },
  line: {
    position: "absolute",
    left: "0",
    top: "30px",
    bottom: "-50px",
    width: "2px",
    background: "rgba(255,255,255,0.1)",
    zIndex: 1
  },
  circle: {
    position: "absolute",
    left: "-5px",
    top: "20px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    zIndex: 2,
    boxShadow: "0 0 10px rgba(0,0,0,0.5)"
  },
  card: {
    background: "rgba(30, 41, 59, 0.6)",
    padding: "20px",
    borderRadius: "10px",
    position: "relative"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },
  versionBadge: {
    background: "rgba(255,255,255,0.1)",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "0.85rem",
    fontWeight: "bold",
    color: "#e2e8f0"
  },
  timeStr: {
    color: "#94a3b8",
    fontSize: "0.9rem"
  },
  hashSection: {
    background: "rgba(0,0,0,0.2)",
    padding: "10px",
    borderRadius: "6px"
  },
  hashLabel: {
    color: "#94a3b8",
    fontSize: "0.8rem",
    display: "block",
    marginBottom: "4px"
  },
  hashValue: {
    color: "#a78bfa",
    fontFamily: "monospace",
    fontSize: "0.9rem",
    wordBreak: "break-all"
  }
};

export default HistoryTimeline;