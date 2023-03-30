const userRoutes = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Add user
userRoutes.post("/register", async (req, res) => {
  const {name, username, password} = req.body;

  if (!name || !username || !password)
    return res.status(400).sned("name, username or password are missing");

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({name, username, passsword: hashPassword});

  const savedUser = await newUser.save();

  res.status(200).json({savedUser});
});

//Get users
userRoutes.get("/", async (req, res) => {
  const users = await User.find({});

  res.status(200).json({users});
});
