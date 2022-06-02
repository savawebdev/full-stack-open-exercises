import React from "react";

const SearchInput = ({ onChange }) => {
  return (
    <div>
      <label htmlFor="search">Find countries</label>
      <input type="text" name="search" id="search" onChange={onChange} />
    </div>
  );
};

export default SearchInput;
