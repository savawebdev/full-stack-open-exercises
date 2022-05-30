import React from "react";

const DisplayPersons = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </>
  );
};

export default DisplayPersons;
