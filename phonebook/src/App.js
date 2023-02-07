import {useState} from "react";

const App = () => {
  const [persons, setPersons] = useState([
    {name: "Arto Hellas", number: "040-123456", id: 1},
    {name: "Ada Lovelace", number: "39-44-5323523", id: 2},
    {name: "Dan Abramov", number: "12-43-234345", id: 3},
    {name: "Mary Poppendieck", number: "39-23-6423122", id: 4},
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.filter((person) => person.name === newName);

    if (personExists.length) {
      alert(`${newName} already exists in the phonebook`);
      setNewNumber("");
      setNewName("");
      return;
    }
    setPersons([...persons, {name: newName, number: newNumber}]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Search name
        <input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name:{" "}
          <input onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <div>
          Number:
          <input
            onChange={(e) => setNewNumber(e.target.value)}
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {searchName
        ? persons
            .filter((person) =>
              person.name.toLowerCase().includes(searchName.toLowerCase())
            )
            .map((person) => (
              <p key={person.name}>
                {person.name} {person.number}
              </p>
            ))
        : persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
    </div>
  );
};

export default App;
