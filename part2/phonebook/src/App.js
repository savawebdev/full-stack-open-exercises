import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();

    const newPerson = { name: newName, phone: newPhone };

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
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input type="number" value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <div key={person.name}>
            <p>
              {person.name} {person.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
