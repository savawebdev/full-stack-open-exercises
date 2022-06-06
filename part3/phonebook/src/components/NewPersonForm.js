import React from "react";

const NewPersonForm = ({ submitHandler, onChange, values }) => {
  return (
    <div>
      <h2>Add new person</h2>
      <form onSubmit={submitHandler}>
        <div>
          name:{" "}
          <input
            type="text"
            value={values.newName}
            onChange={onChange.handleNameChange}
          />
        </div>
        <div>
          number:{" "}
          <input
            type="text"
            value={values.newNumber}
            onChange={onChange.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default NewPersonForm;
