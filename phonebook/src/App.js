import {useState} from "react";

const App = () => {
  const [persons, setPersons] = useState([
    {name: "Arto Hellas", number: "952-857-5874"},
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

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Search name
        <input value={searchName} onChange={handleSearch} />
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
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
