const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ err: "authorization header not found" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        err: "token not found",
      });
    }
    const decoded = jwt.verify(token, "SECERT MESSAGGE");

    const user = await User.findOne({ where: { id: decoded.user.id } });

    if (!user) {
      return res.status(404).json({ err: "User NOT found" });
    }
    req.user = user.dataValues;
    next();
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { isAuthenticated};
