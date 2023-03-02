const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/Person");

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.static("build"));

// morgan.token("body", function (req, res) {
//   return JSON.stringify(req.body);
// });

// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms :body")
// );

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Fetch Persons
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// Get Info
app.get("/info", (req, res) => {
  const date = new Date();

  Person.find({}).then((data) => {
    res.send(`<p>Phonebook has info for ${data.length} people</p>
    <p>${date}</p>`);
  });
});

// Fetch One Single Person
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

// Delete a person
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

// Add a person
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!number || !name)
    return res.status(400).send("Name or Number is missing");

  const person = new Person({ name, number });
  person.save().then((savedPerson) => res.status(200).json(savedPerson));
});

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  next(err);
};

// Update a person
app.put("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() =>
      Person.find({})
        .then((persons) => res.json(persons))
        .catch((err) => next(err))
    )
    .catch((err) => next(err));
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
