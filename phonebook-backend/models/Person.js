require("dotenv").config();
const mongoose = require("mongoose");

const password = process.env.DB_PASSWORD;
const url = `mongodb+srv://jugurtha:${password}@cluster0.tfb3esg.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error(err));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
