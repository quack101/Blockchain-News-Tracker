function HistoryTimeline({ history }) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "15px",
        borderRadius: "10px"
      }}
    >
      <h3 style={{ color: "#38bdf8" }}>
        Modification History (Immutable)
      </h3>

      {history.length === 0 && <p>No history found</p>}

      {history.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <div
            style={{
              border: "1px solid #38bdf8",
              padding: "10px",
              margin: "10px",
              borderRadius: "8px",
              width: "100%"
            }}
          >
            <p><strong>Version {index + 1}</strong></p>
            <p>Hash: {item.hash}</p>
            <p>Time: {item.timestamp}</p>
          </div>

          {index < history.length - 1 && (
            <span style={{ color: "#38bdf8", fontSize: "20px" }}>
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default HistoryTimeline;