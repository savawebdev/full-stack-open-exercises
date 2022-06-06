import React from "react";
import personsService from "../services/persons";

const DisplayPersons = ({ persons, onDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}{" "}
            <button
              onClick={() => {
                onDelete(person.id);
              }}
            >
              delete
            </button>
          </p>
        ))}
      </div>
    </>
  );
};

export default DisplayPersons;
