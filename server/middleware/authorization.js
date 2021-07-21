const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.header("token");
    const payload = jwt.verify(token, process.env.jwtSecret);
    console.log(payload);
    if (payload == null) {
      return res.json(403).json("Not valid token");
    }
    req.user = payload.user;
    next();
  } catch (error) {
    return res.status(403).json("Not authorized");
  }
};
