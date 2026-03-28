import { useState } from "react";
import { getHistory } from "../api";
import HistoryTimeline from "../components/HistoryTimeline";

function ViewHistory() {
  const [id, setId] = useState("");
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await getHistory(id);
    setHistory(res.data);
  };

  return (
    <div>
      <input
        placeholder="Enter Article ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={fetchHistory}>Fetch History</button>

      {history.length > 0 && <HistoryTimeline history={history} />}
    </div>
  );
}

export default ViewHistory;