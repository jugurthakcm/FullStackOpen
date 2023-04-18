const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const loginRoutes = require("express").Router();
const bcrypt = require("bcrypt");

loginRoutes.post("/login", async (req, res) => {
  const {username, password} = req.body;

  if (!username || !password)
    return res.status(400).json({error: "Missing username or password"});

  const user = await User.findOne({username});

  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!user || !isPasswordCorrect)
    return res.status(400).json({error: "Username or password incorrect"});

  const userToken = {username: user.username, id: user._id};

  const token = jwt.sign(userToken, process.env.SECRET);

  res
    .status(200)
    .json({token, username: user.username, name: user.name, id: user.id});
});

module.exports = loginRoutes;
