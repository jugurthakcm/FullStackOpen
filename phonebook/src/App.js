import {useState, useEffect} from "react";
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import {
  getAll,
  addPerson,
  deletePerson,
  updatePerson,
} from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    getAll().then((res) => setPersons(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.find((person) => person.name === newName);

    if (personExists) {
      const confirm = window.confirm(
        `${newName} already exists in the phonebook, repalce old number with new one?`
      );
      if (confirm) {
        updatePerson(personExists._id, {
          ...personExists,
          number: newNumber,
        }).then((res) =>
          setNotification(`${personExists.name} has been updated`)
        );
      }
      return;
    }

    addPerson({name: newName, number: newNumber}).then((res) => {
      setPersons([...persons, res.data]);
      setNotification(`${res.data.name} has been added`);
      setTimeout(() => {
        setNotification();
      }, 3000);
    });

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    const deletedPerson = persons.find((e) => e._id === id);
    const confirm = window.confirm(`Delete ${deletedPerson.name} ?`);
    if (confirm) {
      const updatedPersons = persons.filter((person) => person._id !== id);
      return deletePerson(id).then(() => setPersons([...updatedPersons]));
    }
    return;
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification notification={notification} />

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
      <Persons
        searchName={searchName}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
