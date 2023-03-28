const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/Blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

// Initialize the database
beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

// test if /api/blogs return correct amount of blogs
test("test if /api/blogs return correct amount of blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response._body).toHaveLength(initialBlogs.length);
});

//Test if the response data are returned with an "id"
test("test if response are returned with id", async () => {
  const response = await api.get("/api/blogs");

  response._body.forEach((e) => expect(e.id).toBeDefined());
});

//Test if new blogs are added properly
test("test if new blogs are added properly", async () => {
  const newBlogObject = {
    title: "New Blog",
    author: "New Author",
    url: "New Url",
    likes: 0,
  };

  await api.post("/api/blogs").send(newBlogObject);
  const response = await api.get("/api/blogs");

  expect(response._body).toHaveLength(initialBlogs.length + 1);

  const blogsTitle = response._body.map(blog => blog.title)

  expect(blogsTitle).toContain("New Blog")
});
// Close connection to the DB
afterAll(async () => {
  await mongoose.connection.close();
});
