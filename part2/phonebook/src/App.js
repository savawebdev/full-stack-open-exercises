import { useState } from "react";
import DisplayPersons from "./components/DisplayPersons";
import Filter from "./components/Filter";
import NewPersonForm from "./components/NewPersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filtered, setFiltered] = useState(persons);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
      setPersons([...persons, newPerson]);
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
