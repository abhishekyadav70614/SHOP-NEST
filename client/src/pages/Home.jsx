import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Home({ search }) {
  const { request } = useApp();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("none");

  useEffect(() => {
    request("/products").then(p => { setProducts(p); setStatus("ok"); }).catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <div className="empty">Loading products...</div>;
  if (status === "error") return <div className="empty">Could not load products. Is the server running?</div>;

  const categories = ["All", ...new Set(products.map(p => p.category))];
  let list = products.filter(p =>
    (category === "All" || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase()));
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <>
      <div className="hero">
        <h1>Everyday essentials, delivered to your door</h1>
        <p>Free delivery on orders above ₹999.</p>
      </div>
      <div className="tools">
        {categories.map(c => (
          <button key={c} className={"chip " + (c === category ? "on" : "")} onClick={() => setCategory(c)}>{c}</button>
        ))}
        <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort products">
          <option value="none">Sort: Featured</option>
          <option value="low">Price: Low to high</option>
          <option value="high">Price: High to low</option>
        </select>
      </div>
      {list.length
        ? <div className="grid">{list.map(p => <ProductCard key={p._id} product={p} />)}</div>
        : <div className="empty">No products match your search. Try a different word.</div>}
    </>
  );
}