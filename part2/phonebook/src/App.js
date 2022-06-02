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
      const confirmation = window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmation) {
        personsService.update(checkPerson.id, newPerson).then((res) => {
          setPersons(persons.map((p) => (p.id !== checkPerson.id ? p : res)));
          setFiltered(persons.map((p) => (p.id !== checkPerson.id ? p : res)));
        });
      }

      return;
    } else {
      personsService.create(newPerson).then((res) => {
        setPersons([...persons, res]);
        setFiltered([...persons, res]);
      });
    }
  };

  const deletePerson = (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this person?"
    );

    if (confirmation) {
      personsService.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
      setFiltered(filtered.filter((person) => person.id !== id));
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

      <DisplayPersons persons={filtered} onDelete={deletePerson} />
    </div>
  );
};

export default App;
