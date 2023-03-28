require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");
const blogRoutes = require("./controllers/blogs");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl).then(() => logger.info("Connected to Database"));

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRoutes);

module.exports = app;