const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticate = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token) {
    token = token.split("bearer")[1];
    jwt.verify(token, process.env.SECRATE_KEY, (err, valid) => {
      if (err) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        req.user = valid;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticate;
