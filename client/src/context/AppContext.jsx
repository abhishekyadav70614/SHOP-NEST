import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "../api.js";

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
};

export function AppProvider({ children }) {
  const [auth, setAuth] = useState(() => load("bz_auth", null)); // { token, user }
  const [cart, setCart] = useState(() => load("bz_cart", []));
  const [toast, setToast] = useState("");

  useEffect(() => save("bz_auth", auth), [auth]);
  useEffect(() => save("bz_cart", cart), [cart]);

  const notify = useCallback(msg => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }, []);

  // Login ya signup
  const authenticate = async (mode, form) => {
    const data = await api(`/auth/${mode}`, { method: "POST", body: form });
    setAuth(data);
    notify(`Welcome, ${data.user.name.split(" ")[0]}!`);
  };
  const logout = () => { setAuth(null); notify("You are logged out"); };

  // Token wali requests. Token purana ho to apne aap logout kar deta hai
  const request = async (path, opts = {}) => {
    try {
      return await api(path, { ...opts, token: auth?.token });
    } catch (e) {
      if (e.status === 401) setAuth(null);
      throw e;
    }
  };

  // Cart
  const addToCart = p => {
    setCart(c => c.find(i => i._id === p._id)
      ? c.map(i => (i._id === p._id ? { ...i, qty: i.qty + 1 } : i))
      : [...c, { _id: p._id, name: p.name, price: p.price, emoji: p.emoji, qty: 1 }]);
    notify("Added to cart");
  };
  const changeQty = (id, d) =>
    setCart(c => c.map(i => (i._id === id ? { ...i, qty: i.qty + d } : i)).filter(i => i.qty > 0));
  const removeItem = id => setCart(c => c.filter(i => i._id !== id));

  const placeOrder = async () => {
    await request("/orders", { method: "POST", body: { items: cart.map(i => ({ id: i._id, qty: i.qty })) } });
    setCart([]);
    notify("Order placed successfully!");
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <Ctx.Provider value={{ user: auth?.user, authenticate, logout, request, cart, cartCount, cartTotal,
      addToCart, changeQty, removeItem, placeOrder, toast, notify }}>
      {children}
    </Ctx.Provider>
  );
}