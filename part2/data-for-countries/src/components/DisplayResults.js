import React from "react";
import CountryInfo from "./CountryInfo";
import ResultLine from "./ResultLine";

const DisplayResults = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => (
          <ResultLine country={country} key={country.name.common} />
        ))}
      </div>
    );
  }

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  }
};

export default DisplayResults;
