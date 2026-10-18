import { useState } from "react";
import { useApp } from "./context/AppContext.jsx";
import Navbar from "./components/Navbar.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import AuthModal from "./components/AuthModal.jsx";
import Home from "./pages/Home.jsx";
import Orders from "./pages/Orders.jsx";

export default function App() {
  const { user, toast } = useApp();
  const [view, setView] = useState("shop");       // "shop" ya "orders"
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null); // null, "login" ya "signup"

  return (
    <>
      <Navbar search={search} setSearch={setSearch} setView={setView}
        onCart={() => setCartOpen(true)} onLogin={() => setAuthMode("login")} />
      <main>{view === "orders" && user ? <Orders /> : <Home search={search} />}</main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}
        onNeedLogin={() => setAuthMode("login")} onOrdered={() => setView("orders")} />
      {authMode && <AuthModal mode={authMode} setMode={setAuthMode} onClose={() => setAuthMode(null)} />}
      <div id="toast" className={toast ? "on" : ""} role="status">{toast}</div>
    </>
  );
}