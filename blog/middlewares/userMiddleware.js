const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getToken = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer "))
    req.token = authorization.replace("Bearer ", "");

  next();
};

const userExtractor = async (req, res, next) => {
  if (!req.token) return res.status(401).send("Unauthorized");

  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) return res.status(400).send("Invalid token");

  const user = await User.findOne({_id: decodedToken.id});

  req.user = user;

  next();
};
module.exports = {getToken, userExtractor};
