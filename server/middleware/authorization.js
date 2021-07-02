const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.header("token");
    const payload = jwt.verify(token, process.env.jwtSecret);
    if (payload == null) {
      return res.json(403).josn("Not valid token");
    }
    req.user = payload.user;
    next();
  } catch (error) {
    return res.status(403).json("Not authorized");
  }
};
