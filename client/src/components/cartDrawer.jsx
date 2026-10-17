import { useApp } from "/context/AppContext.jsx";
import { inr } from "../api.js";

export default function CartDrawer({ open, onClose, onNeedLogin, onOrdered }) {
  const { user, cart, cartTotal, changeQty, removeItem, placeOrder, notify } = useApp();

  const checkout = async () => {
    if (!user) { onClose(); onNeedLogin(); notify("Log in to place your order"); return; }
    try { await placeOrder(); onClose(); onOrdered(); } catch (e) { notify(e.message); }
  };

  return (
    <>
      <div className={"shade " + (open ? "on" : "")} onClick={onClose} />
      <aside className={"panel " + (open ? "open" : "")} aria-label="Shopping cart">
        <h2>Your cart <button className="x" onClick={onClose} aria-label="Close cart">×</button></h2>
        <div className="pbody">
          {cart.length === 0 && <div className="empty">Your cart is empty.</div>}
          {cart.map(i => (
            <div className="row" key={i._id}>
              <span className="em">{i.emoji}</span>
              <div className="n"><b>{i.name}</b><br />{inr(i.price)}</div>
              <div className="qty">
                <button onClick={() => changeQty(i._id, -1)} aria-label="Decrease">−</button> {i.qty}{" "}
                <button onClick={() => changeQty(i._id, 1)} aria-label="Increase">+</button>
              </div>
              <button className="x" onClick={() => removeItem(i._id)} aria-label="Remove">×</button>
            </div>
          ))}
        </div>
        <div className="pfoot">
          <div className="total"><span>Total</span><span>{inr(cartTotal)}</span></div>
          <button className="btn main" disabled={!cart.length} onClick={checkout}>Place order</button>
        </div>
      </aside>
    </>
  );
}