const Product = require("./models/Product");

const products = [
  ["Wireless Earbuds", "Electronics", 1499, "🎧", "#d6ecf5"], ["Smart Watch", "Electronics", 2999, "⌚", "#e0e4f7"],
  ["Power Bank 10000mAh", "Electronics", 999, "🔋", "#dff2df"], ["Cotton T-Shirt", "Fashion", 499, "👕", "#fbe3d8"],
  ["Running Shoes", "Fashion", 1899, "👟", "#fde9b8"], ["Backpack", "Fashion", 1299, "🎒", "#e6dcf5"],
  ["Steel Water Bottle", "Home", 399, "🍶", "#d8f0ea"], ["Desk Lamp", "Home", 849, "💡", "#fff1c2"],
  ["Coffee Mug Set", "Home", 599, "☕", "#f2e1d3"], ["Python Programming Book", "Books", 699, "📘", "#d9e6fb"],
  ["Notebook Pack (5)", "Books", 249, "📒", "#f9dfe3"], ["Yoga Mat", "Sports", 799, "🧘", "#e0f2e9"],
];

// Products table khali ho to 12 products apne aap daal deta hai
module.exports = async function seedProducts() {
  if ((await Product.countDocuments()) > 0) return;
  await Product.insertMany(products.map(([name, category, price, emoji, color]) => ({ name, category, price, emoji, color })));
  console.log("Seeded 12 products");
};