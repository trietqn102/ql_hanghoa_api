const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, "Qlhanghoa2024", (err, user) => {
      if (err) res.status(403).json({ error: "Token is invalid" });
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = verifyToken;
