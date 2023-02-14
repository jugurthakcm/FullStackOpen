import {useState, useEffect} from "react";
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import {getAll, addPerson} from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    getAll().then((res) => setPersons(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExists =
      persons.length && persons.filter((person) => person.name === newName);

    if (personExists.length) {
      alert(`${newName} already exists in the phonebook`);
      setNewNumber("");
      setNewName("");
      return;
    }

    addPerson({name: newName, number: newNumber}).then((res) =>
      setPersons([...persons, res.data])
    );

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
