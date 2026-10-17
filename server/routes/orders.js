const router = require("express").Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const wrap = require("../middleware/wrap");

// POST /api/orders  (login zaroori)
// Price hamesha database se li jati hai, browser ki bheji price par bharosa nahi
router.post("/", auth, wrap(async (req, res) => {
  const cart = Array.isArray(req.body.items) ? req.body.items : [];
  if (!cart.length) return res.status(400).json({ error: "Cart is empty" });

  const products = await Product.find({ _id: { $in: cart.map(i => i.id) } });
  const items = [];
  for (const c of cart) {
    const p = products.find(x => String(x._id) === String(c.id));
    const qty = Number(c.qty);
    if (!p || !Number.isInteger(qty) || qty < 1 || qty > 20) return res.status(400).json({ error: "Invalid item in cart" });
    items.push({ product: p._id, name: p.name, emoji: p.emoji, price: p.price, qty });
  }
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const order = await Order.create({ user: req.user.id, items, total });
  res.status(201).json({ id: order._id, total });
}));

// GET /api/orders  (sirf is user ke orders)
router.get("/", auth, wrap(async (req, res) => {
  res.json(await Order.find({ user: req.user.id }).sort({ createdAt: -1 }));
}));

module.exports = router;