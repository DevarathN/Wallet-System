import { useState } from "react";
import { creditWallet, debitWallet } from "../api/api";

function AdminDashboard() {
  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleAction = async (type) => {
    if (!clientId || !amount) return alert("Fill all fields");

    try {
      if (type === "credit") {
        await creditWallet({
          client_id: clientId,
          amount: Number(amount),
        });
        setMessage("Wallet Credited");
      } else {
        await debitWallet({
          client_id: clientId,
          amount: Number(amount),
        });
        setMessage("Wallet Debited");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <input
        placeholder="Client ID"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => handleAction("credit")}>Credit</button>
        <button
          onClick={() => handleAction("debit")}
          style={{ marginLeft: "10px" }}
        >
          Debit
        </button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminDashboard;
