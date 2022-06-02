import { useEffect, useState } from "react";
import axios from "axios";
import personsService from "./services/persons";
import DisplayPersons from "./components/DisplayPersons";
import Filter from "./components/Filter";
import NewPersonForm from "./components/NewPersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filtered, setFiltered] = useState(persons);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personsService.getAll().then((data) => {
      setPersons(data);
      setFiltered(data);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value.toLowerCase();
    console.log(e.target.value);

    if (filter.length === 0) {
      setFiltered(persons);
    } else {
      const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(filter)
      );
      setFiltered(filteredPersons);
    }
  };

  const addPerson = (e) => {
    e.preventDefault();

    const newPerson = { name: newName, number: newNumber };

    const checkPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (checkPerson) {
      window.alert(`${newPerson.name} is already added to phonebook`);
      return;
    } else {
      personsService.create(newPerson).then((res) => {
        setPersons([...persons, res]);
        setFiltered([...persons, res]);
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <NewPersonForm
        submitHandler={addPerson}
        onChange={{ handleNameChange, handleNumberChange }}
        values={{ newName, newNumber }}
      />

      <Filter onChange={handleFilterChange} />

      <DisplayPersons persons={filtered} />
    </div>
  );
};

export default App;
