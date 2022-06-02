import React from "react";
import CountryInfo from "./CountryInfo";

const DisplayResults = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length > 1 && countries.length <= 10) {
    console.log(countries);
    return (
      <div>
        {countries.map((country) => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
      </div>
    );
  }

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  }
};

export default DisplayResults;
