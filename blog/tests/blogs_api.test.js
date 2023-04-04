const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const blogHelper = require("../utils/blog_helper");
const userHelper = require("../utils/user_test_helper");

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

const initialUser = {
  name: "juuju ka",
  username: "juujuu",
  password: "password",
};

let token = "";

// Initialize the database
beforeEach(async () => {
  // Initialize blogs
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);

  // Initialize User
  await User.deleteMany({});

  await userHelper.addUser().send(initialUser);

  const loggedUser = await userHelper
    .loginUser()
    .send({username: initialUser.username, password: initialUser.password});

  token = loggedUser._body.token;
});

describe("Fetching Blogs", () => {
  // Test if /api/blogs return correct amount of blogs
  test("test if /api/blogs return correct amount of blogs", async () => {
    const response = await blogHelper.getBlogs();

    expect(response._body).toHaveLength(initialBlogs.length);
  });

  // Test if the response data are returned with an "id"
  test("test if response are returned with id", async () => {
    const response = await blogHelper.getBlogs();

    response._body.forEach((e) => expect(e.id).toBeDefined());
  });
});

describe("Adding New Blogs", () => {
  // Test if new blogs are added properly
  test("test if new blogs are added properly", async () => {
    const newBlogObject = {
      title: "New Blog",
      url: "New Url",
      likes: 7,
    };

    await blogHelper
      .addBlog()
      .set("authorization", `Bearer ${token}`)
      .send(newBlogObject)
      .expect(201);

    const response = await blogHelper
      .getBlogs()
      .set("authorization", `Bearer ${token}`)
      .expect(200);

    expect(response._body).toHaveLength(initialBlogs.length + 1);

    const blogsTitle = response._body.map((blog) => blog.title);

    expect(blogsTitle).toContain("New Blog");
  });

  // Test if likes property is defaulted to 0
  test("Test if likes property is defaulted to 0", async () => {
    const newBlogObject = {
      title: "New Blog",
      author: "New Author",
      url: "New Url",
    };

    const response = await blogHelper.addBlog().send(newBlogObject).expect(201);

    expect(response._body.likes).toBe(0);
  });

  // Test if title or url is missing 400 Bad Request is sent
  test("Test if title or url is missing 400 Bad Request is sent", async () => {
    const newBlogObject = {
      author: "New Author",
      title: "nwddsd",
      likes: 12,
    };
    const response = await blogHelper.addBlog().send(newBlogObject);

    expect(response.status).toBe(400);
  });

  test("Test if no token provided 401 Unauthorized is sent when add new blog", async () => {
    const newBlogObject = {
      title: "New Blog",
      url: "New Url",
      likes: 7,
    };

    await blogHelper.addBlog().send(newBlogObject).expect(401);
  });
});

describe("Delete a blog", () => {
  // Test if delete a blog works
  test("Test if delete a blog works", async () => {
    const blogsAtStart = await blogHelper.getBlogs();
    const blogToDelete = blogsAtStart._body[0];

    await blogHelper.deleteBlog(blogToDelete.id).expect(204);

    const blogsAtEnd = await blogHelper.getBlogs();

    expect(blogsAtEnd._body).toHaveLength(initialBlogs.length - 1);
  });
});

describe("Update a blog", () => {
  // Test if updating likes works
  test("Test if updating likes in a blog works", async () => {
    const likes = 45;

    const blogsAtStart = await blogHelper.getBlogs();
    const blogToUpdate = blogsAtStart._body[0];

    await blogHelper.updateBlog(blogToUpdate.id).send({likes}).expect(200);

    const blogsAtEnd = await blogHelper.getBlogs();

    expect(blogsAtEnd._body[0].likes).toBe(likes);
  });
});

// Close connection to the DB
afterAll(async () => {
  await mongoose.connection.close();
});
