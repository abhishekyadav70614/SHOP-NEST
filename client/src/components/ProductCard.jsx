import { useApp } from "/context/AppContext.jsx";
import { inr } from "../api.js";

export default function ProductCard({ product }) {
  const { addToCart } = useApp();
  return (
    <div className="card">
      <div className="thumb" style={{ background: product.color }}>{product.emoji}</div>
      <div className="info">
        <span className="cat">{product.category}</span>
        <h3>{product.name}</h3>
        <div className="price">{inr(product.price)}</div>
        <button className="btn" onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    </div>
  );
}