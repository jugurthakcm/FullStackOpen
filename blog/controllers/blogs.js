const blogRoutes = require("express").Router();
const Blog = require("../models/Blog");


blogRoutes.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {name: 1, username: 1});

  response.status(200).json(blogs);
});

// Add a blog
blogRoutes.post("/", async (request, response) => {
  const token = request.token;

  if (!token) return response.status(401).send("Unauthorized action");

  if (!request.body.title || !request.body.url)
    return response.status(400).send("Can't add blog");

  // const decodedToken = jwt.verify(token, process.env.SECRET);

  // if (!decodedToken.id) return response.status(400).send("Invalid token");

  // const user = await User.findOne({ _id: decodedToken.id });

  const user = request.user;

  const blog = new Blog({
    ...request.body,
    user: user._id,
    author: user.username,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  response.status(201).send("Blog created successfully");
});

// delete a blog
blogRoutes.delete("/:id", async (request, response) => {
  const id = request.params.id;

  if (!id) return response.status(400).end();

  const token = request.token;

  if (!token) return response.status(403).send("Action forbiddent");

  // const userToken = jwt.verify(token, process.env.SECRET);

  // if (!userToken.id) return response.status(400).send("Invalid token");

  const user = request.user;

  const blogToDelete = await Blog.findById(id);

  if (user.id !== blogToDelete.user.toString())
    return response.status(403).send("Action forbidden");

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
