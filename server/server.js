require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const seedProducts = require("./seed");

const app = express();
app.use(express.json({ limit: "20kb" }));

// ----- API routes -----
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));

// ----- React ki built website dikhana -----
const dist = path.join(__dirname, "../client/dist");
app.use(express.static(dist));
app.get("*", (req, res) => res.sendFile(path.join(dist, "index.html")));

// ----- Error handler -----
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === "CastError") return res.status(400).json({ error: "Invalid item in cart" });
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5000;
connectDB()
  .then(seedProducts)
  .then(() => app.listen(PORT, () => console.log(`ShopNest running on http://localhost:${PORT}`)))
  .catch(err => { console.error("Startup failed:", err.message); process.exit(1); });