import { useApp } from "../context/AppContext.jsx";

export default function Navbar({ search, setSearch, setView, onCart }) {
  const { user, logout, cartCount } = useApp();
  return (
    <header>
      <div className="bar">
        <div className="logo" onClick={() => setView("shop")}>Shop<span>Nest</span></div>
        <input className="search" type="search" placeholder="Search products" aria-label="Search products"
          value={search} onChange={e => { setSearch(e.target.value); setView("shop"); }} />
        <button className="btn ghost" onClick={() => setView("orders")}>My orders</button>
        <span className="hello">Hi, {user.name.split(" ")[0]}</span>
        <button className="btn" onClick={() => { logout(); setView("shop"); }}>Log out</button>
        <button className="btn" onClick={onCart}>Cart ({cartCount})</button>
      </div>
    </header>
  );
}