const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const wrap = require("../middleware/wrap");

// GET /api/products  (login zaroori) - sab products
router.get("/", auth, wrap(async (req, res) => {
  res.json(await Product.find().sort({ _id: 1 }));
}));

module.exports = router;