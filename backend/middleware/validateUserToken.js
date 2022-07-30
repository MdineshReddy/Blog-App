const JWT = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const authHeader = req.headers?.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res
      .status(400)
      .json({ success: false, error: "Missing Authorization Token" });
  }
  try {
    const validToken = JWT.verify(token, process.env.JWT_SECRET);
    req.user = validToken;
    next();
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = validateToken;
