const User = require("../models/User");
const Blog = require("../models/Blog");

const testingRoutes = require("express").Router();

testingRoutes.post("/reset", async (req, res) => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  res.status(204).end();
});

module.exports = testingRoutes;
