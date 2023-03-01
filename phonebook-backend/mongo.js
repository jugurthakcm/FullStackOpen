require("dotenv").config();
const mongoose = require("mongoose");

const password = process.env.DB_PASSWORD;
const url = `mongodb+srv://jugurtha:${password}@cluster0.tfb3esg.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 2) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3],
  });

  person.save().then(({name, number}) => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((data) => {
    console.log("Phonebook:");
    data.map((e) => console.log(e.name, e.number));
    mongoose.connection.close();
  });
}
