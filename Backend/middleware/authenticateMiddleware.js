const jwt = require("jsonwebtoken");

const protectedRouteMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access: Token missing",
        status: "failure",
      });
    }
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.id = decryptedToken.id;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = { protectedRouteMiddleware };
