const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  emoji: String,
  color: String,
});

module.exports = mongoose.model("Product", productSchema);