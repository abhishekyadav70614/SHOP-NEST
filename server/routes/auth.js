const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const wrap = require("../middleware/wrap");

const sign = u =>
  jwt.sign({ id: u._id, name: u.name, email: u.email }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" });
const publicUser = u => ({ id: u._id, name: u.name, email: u.email });

// POST /api/auth/signup
router.post("/signup", wrap(async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !/^\S+@\S+\.\S+$/.test(email || "")) return res.status(400).json({ error: "Enter a valid name and email" });
  if (!password || password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });
  if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ error: "This email is already registered" });
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
  res.status(201).json({ token: sign(user), user: publicUser(user) });
}));

// POST /api/auth/login
router.post("/login", wrap(async (req, res) => {
  const { email, password } = req.body || {};
  const user = await User.findOne({ email: (email || "").toLowerCase() });
  if (!user || !(await bcrypt.compare(password || "", user.password))) return res.status(401).json({ error: "Wrong email or password" });
  res.json({ token: sign(user), user: publicUser(user) });
}));

module.exports = router;