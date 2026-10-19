import { useState } from "react";
import { useApp } from "../context/AppContext.jsx";

// Pehla page: login ke bina aage kuch nahi dikhta
export default function Login() {
  const { authenticate } = useApp();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const signup = mode === "signup";
  const set = key => e => setForm({ ...form, [key]: e.target.value });

  const submit = async () => {
    setError("");
    try { await authenticate(mode, form); }
    catch (e) { setError(e.message); }
  };

  return (
    <div className="authpage">
      <div className="box">
        <h1 className="logo">Shop<span>Nest</span></h1>
        <p className="sub">{signup ? "Create your account to start shopping" : "Log in to start shopping"}</p>
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
      </div>
    </div>
  );
}