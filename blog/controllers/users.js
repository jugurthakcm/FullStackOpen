const userRoutes = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Add user
userRoutes.post("/register", async (req, res) => {
  const {name, username, password} = req.body;

  if (!name || !username || !password)
    return res.status(400).send("name, username or password are missing");

  if (username.length < 3 || password.length < 3)
    return res
      .status(400)
      .json({error: "username or password doesn't meet length requirements"});

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({name, username, password: hashPassword});

  const savedUser = await newUser.save();

  res.status(200).json(savedUser);
});

//Get users
userRoutes.get("/", async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
});

module.exports = userRoutes;
