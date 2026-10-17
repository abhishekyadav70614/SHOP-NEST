import { useEffect, useState } from "react";
import { useApp } from "/context/AppContext.jsx";
import { inr } from "../api.js";

export default function Orders() {
  const { request, notify } = useApp();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    request("/orders").then(setOrders).catch(e => { notify(e.message); setOrders([]); });
  }, []);

  if (!orders) return <div className="empty">Loading your orders...</div>;
  return (
    <>
      <h2 style={{ marginBottom: 14 }}>My orders</h2>
      {orders.length === 0 && <div className="empty">You have no orders yet. Start shopping!</div>}
      {orders.map(o => (
        <div className="order" key={o._id}>
          <b>Order #{o._id.slice(-6).toUpperCase()}</b> <small>{new Date(o.createdAt).toLocaleString()}</small><br />
          {o.items.map(i => <div key={i._id}>{i.emoji} {i.name} × {i.qty}</div>)}
          <b>Total: {inr(o.total)}</b>
        </div>
      ))}
    </>
  );
}