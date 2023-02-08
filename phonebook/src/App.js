import {useState, useEffect} from "react";
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    axios
      .get("https://api.jsonbin.io/v3/qs/63e3d685c0e7653a05728226")
      .then((res) => setPersons(res.data.record.persons));
  }, []);

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
      <Filter searchName={searchName} setSearchName={setSearchName} />

      <h2>Add new</h2>
      <AddPerson
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons searchName={searchName} persons={persons} />
    </div>
  );
};

export default App;
