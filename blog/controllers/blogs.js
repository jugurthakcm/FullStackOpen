const blogRoutes = require("express").Router();
const Blog = require("../models/Blog");

blogRoutes.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRoutes.post("/", (request, response) => {
  if (!request.body.title || !request.body.url)
    return response.status(400).end();

  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

blogRoutes.delete("/:id", async (request, response) => {
  const id = request.params.id;

  if (!id) return response.status(400).end();

  const deletedBlog = await Blog.findByIdAndDelete(id);

  response.status(204).end();
});

module.exports = blogRoutes;
