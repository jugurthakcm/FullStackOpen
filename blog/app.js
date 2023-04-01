require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");
const blogRoutes = require("./controllers/blogs");
const userRoutes = require("./controllers/users");
const loginRoutes = require("./controllers/login");
const errorHandler = require("./middlewares/errorHandler");
const { getToken } = require("./middlewares/userMiddleware");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl).then(() => logger.info("Connected to Database"));

app.use(cors());
app.use(express.json());
app.use(getToken);

app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/", loginRoutes);

app.use(errorHandler);

module.exports = app;
