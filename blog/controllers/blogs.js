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
