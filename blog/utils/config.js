require("dotenv").config();

const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.NODE_ENV === "test" ? config.TEST_MONGODB_URI : config.MONGODB_URI


module.exports = {PORT, MONGODB_URI};
