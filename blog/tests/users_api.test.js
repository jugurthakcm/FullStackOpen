const mongoose = require("mongoose");
const User = require("../models/User");
const userHelper = require("../utils/user_test_helper");

const initialUsers = [
  {
    name: "full name 1",
    username: "name1",
    password: "password1",
  },
  {
    name: "full name 2",
    username: "name2",
    password: "password2",
  },
];

// Initialize the database
beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = initialUsers.map((user) => new User(user));

  const promiseArray = userObjects.map((user) => user.save());

  await Promise.all(promiseArray);
});

// Test Fetching Users
describe("Fetching Users", () => {
  test("if /api/users return correct amount of users", async () => {
    const response = await userHelper
      .getUsers()
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response._body).toHaveLength(initialUsers.length);
  });
});

// Test Adding Users
describe("Adding users", () => {
  test("if add new user works properly", async () => {
    const newUser = {
      name: "full name 3",
      username: "name3",
      password: "password3",
    };

    await userHelper.addUser().send(newUser).expect(200);

    const response = await userHelper
      .getUsers()
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response._body).toHaveLength(initialUsers.length + 1);
  });

  test("if missing property on user object, 400 BAD Request is sent", async () => {
    const newUser = {
      name: "full name 3",
      // username: "name3",
      password: "password3",
    };

    await userHelper.addUser().send(newUser).expect(400);
  });

  test("test if duplicate username is added, 400 BAD REQUEST is sent", async () => {
    const newUser = initialUsers[0];

    const response = await userHelper.addUser().send(newUser).expect(400);

    expect(response._body.error).toContain("username already exists");
  });

  test("test if duplicate username or password doesn't meet length, 400 BAD REQUEST is sent", async () => {
    const newUser = {
      name: "full name",
      username: "kldd",
      password: "jd",
    };

    const response = await userHelper.addUser().send(newUser).expect(400);

    expect(response._body.error).toContain("doesn't meet length requirements");
  });
});

// Close connection to the database
afterAll(async () => await mongoose.connection.close());
