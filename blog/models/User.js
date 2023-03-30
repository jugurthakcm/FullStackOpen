const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: {type: String, minLength: 3},
  username: {type: String, minLength: 3, unique: true},
  password: {type: String, minLength: 3},
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

userSchema.plugin(uniqueValidator,{message: "{PATH} already exists"});

module.exports = mongoose.model("User", userSchema);
