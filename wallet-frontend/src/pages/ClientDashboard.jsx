import { useEffect, useState } from "react";
import { getWalletBalance, createOrder } from "../api/api";
import { useNavigate } from "react-router-dom";

function ClientDashboard() {
  const clientId = "client123"; // Replace with auth later
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadBalance = async () => {
      try {
        const res = await getWalletBalance(clientId);
        if (isMounted) {
          setBalance(res.data.balance);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Failed to load balance");
      }
    };

    loadBalance();

    return () => {
      isMounted = false;
    };
  }, [clientId]);

  const handleOrder = async () => {
    if (!amount) return alert("Enter amount");

    setLoading(true);
    setError("");

    try {
      const res = await createOrder(Number(amount), clientId);
      navigate(`/order/${res.data.order_id}`);
    } catch (err) {
      setError(err.response?.data?.error || "Order failed");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>Client Dashboard</h2>

      <h3>Wallet Balance: ₹{balance}</h3>

      <input
        type="number"
        placeholder="Order Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleOrder} disabled={loading} style={styles.button}>
        {loading ? "Processing..." : "Create Order"}
      </button>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  input: { display: "block", marginBottom: "10px", padding: "8px" },
  button: { padding: "8px 16px" },
  error: { color: "red" },
};

export default ClientDashboard;
