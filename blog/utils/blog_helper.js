const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const getBlogs = () => api.get("/api/blogs");

const addBlog = () => api.post("/api/blogs");

const updateBlog = (id) => api.put(`/api/blogs/${id}`);

const deleteBlog = (id) => api.delete(`/api/blogs/${id}`);

module.exports = {getBlogs, addBlog, updateBlog, deleteBlog};
