import { useState } from "react";
import { useApp } from "/context/AppContext.jsx";

export default function AuthModal({ mode, setMode, onClose }) {
  const { authenticate } = useApp();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const signup = mode === "signup";
  const set = key => e => setForm({ ...form, [key]: e.target.value });

  const submit = async () => {
    setError("");
    try { await authenticate(mode, form); onClose(); }
    catch (e) { setError(e.message); }
  };

  return (
    <>
      <div className="shade on" onClick={onClose} />
      <div className="modal on">
        <div className="box">
          <h2>{signup ? "Create account" : "Log in"}</h2>
          {signup && (<><label htmlFor="name">Full name</label>
            <input id="name" value={form.name} onChange={set("name")} autoComplete="name" /></>)}
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={form.email} onChange={set("email")} autoComplete="email" />
          <label htmlFor="pass">Password (min 6 characters)</label>
          <input id="pass" type="password" value={form.password} onChange={set("password")}
            onKeyDown={e => e.key === "Enter" && submit()} autoComplete="current-password" />
          <div className="err">{error}</div>
          <button className="btn main" onClick={submit}>{signup ? "Sign up" : "Log in"}</button>
          <button className="link" onClick={() => { setError(""); setMode(signup ? "login" : "signup"); }}>
            {signup ? "Already have an account? Log in" : "New here? Create an account"}
          </button>
          <button className="link" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </>
  );
}