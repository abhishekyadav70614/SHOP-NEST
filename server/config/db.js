const mongoose = require("mongoose");

// MongoDB se jodta hai. Address .env file ke MONGO_URI me rakha hota hai.
module.exports = async function connectDB() {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing in .env file");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};