const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const addUser = () => api.post("/api/users/register");

const getUsers = () => api.get("/api/users");

const loginUser = () => api.post("/login");

module.exports = {addUser, getUsers, loginUser};
