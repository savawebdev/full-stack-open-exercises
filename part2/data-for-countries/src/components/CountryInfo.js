import React from "react";
import DisplayWeather from "./DisplayWeather";

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`${country.name.common} flag`} />

      <DisplayWeather city={country.capital} />
    </div>
  );
};

export default CountryInfo;
