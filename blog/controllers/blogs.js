const blogRoutes = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

blogRoutes.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {name: 1, username: 1});

  response.status(200).json(blogs);
});

blogRoutes.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url)
    return response.status(400).send("Body or Url is missing");

  const user = await User.findOne({_id: request.body.userId});

  console.log(user._id);
  const blog = new Blog({...request.body, user: user._id});

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  response.status(201).send("Blog created successfully");
});

blogRoutes.delete("/:id", async (request, response) => {
  const id = request.params.id;

  if (!id) return response.status(400).end();

  await Blog.findByIdAndDelete(id);

  response.status(204).end();
});

blogRoutes.put("/:id", async (request, response) => {
  const id = request.params.id;

  const {likes} = request.body;

  if (!id || !likes) return response.status(400).end();

  const updatedBlog = await Blog.findByIdAndUpdate(id, {likes}, {new: true});

  response.status(200).send(updatedBlog);
});

module.exports = blogRoutes;
