import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../api/api";

function OrderDetails() {
  const { id } = useParams();
  const clientId = "client123";

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadOrder = async () => {
      try {
        const res = await getOrder(id, clientId);
        if (isMounted) setOrder(res.data);
      } catch (err) {
        if (isMounted) setError("Order not found");
      }
    };

    loadOrder();

    return () => {
      isMounted = false;
    };
  }, [id, clientId]);

  if (error) return <div>{error}</div>;
  if (!order) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Details</h2>
      <p>
        <strong>ID:</strong> {order._id}
      </p>
      <p>
        <strong>Amount:</strong> ₹{order.amount}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Fulfillment ID:</strong> {order.fulfillment_id}
      </p>
    </div>
  );
}

export default OrderDetails;
