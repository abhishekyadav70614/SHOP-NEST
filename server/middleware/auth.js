const jwt = require("jsonwebtoken");

// Guard: sirf logged-in user ko aage jaane deta hai
module.exports = function auth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    next();
  } catch {
    res.status(401).json({ error: "Please log in again" });
  }
};