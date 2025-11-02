const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "devsecret");

    // ✅ Since your token has { id: ... }, not { user: { id: ... } }
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
