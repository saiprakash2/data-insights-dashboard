import { useEffect, useState } from "react";
import { getData, addData } from "./api/dataService";

interface DataRecord {
  id: number;
  category: string;
  amount: number;
  createdAt: string;
}

interface Summary {
  record_count: number;
  total_amount: number;
}

function App() {
  const [records, setRecords] = useState<DataRecord[]>([]);
  const [newRecord, setNewRecord] = useState({ category: "", amount: 0 });
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    getData().then(setRecords);

    // 🔹 Fetch analytics summary from Node API
    fetch("http://34.234.85.99:4000/api/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Error fetching summary:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const saved = await addData(newRecord);
    setRecords([...records, saved]);
    setNewRecord({ category: "", amount: 0 });

    // 🔄 refresh summary after adding new data
    fetch("http://34.234.85.99:4000/api/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Inter, sans-serif" }}>
      <h2>📊 Data Insights</h2>

      {/* 🔹 Analytics Summary Section */}
      {summary ? (
        <div
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "black",
          }}
        >
          <p>
            <strong>Total Records:</strong> {summary.record_count}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{summary.total_amount}
          </p>
        </div>
      ) : (
        <p>Loading summary...</p>
      )}

      {/* 🔹 Form for new record */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
        <input
          placeholder="Category"
          value={newRecord.category}
          onChange={(e) =>
            setNewRecord({ ...newRecord, category: e.target.value })
          }
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newRecord.amount}
          onChange={(e) =>
            setNewRecord({ ...newRecord, amount: parseFloat(e.target.value) })
          }
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Add Record</button>
      </form>

      {/* 🔹 Data list */}
      <ul>
        {records.map((r) => (
          <li key={r.id}>
            <strong>{r.category}</strong> — ₹{r.amount} on{" "}
            {new Date(r.createdAt).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
