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
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
          v
        );
      },
      message: (input) => `${input.value} is not a valid phone number`,
    },
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
