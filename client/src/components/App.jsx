import { useState } from "react";
import { useApp } from "./context/AppContext.jsx";
import Navbar from "./components/Navbar.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Orders from "./pages/Orders.jsx";

export default function App() {
  const { user, toast } = useApp();
  const [view, setView] = useState("shop"); // "shop" ya "orders"
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      {user ? (
        <>
          <Navbar search={search} setSearch={setSearch} setView={setView} onCart={() => setCartOpen(true)} />
          <main>{view === "orders" ? <Orders /> : <Home search={search} />}</main>
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onOrdered={() => setView("orders")} />
        </>
      ) : (
        <Login />
      )}
      <div id="toast" className={toast ? "on" : ""} role="status">{toast}</div>
    </>
  );
}