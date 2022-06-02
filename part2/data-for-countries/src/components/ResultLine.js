import React from "react";
import { useState } from "react";
import CountryInfo from "./CountryInfo";

const ResultLine = ({ country }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleShowClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div key={country.name.common}>
      {country.name.common} <button onClick={handleShowClick}>show</button>
      {showInfo && <CountryInfo country={country} />}
    </div>
  );
};

export default ResultLine;
