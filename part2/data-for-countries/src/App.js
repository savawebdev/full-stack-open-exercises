import { useState, useEffect } from "react";
import axios from "axios";
import DisplayResults from "./components/DisplayResults";
import SearchInput from "./components/SearchInput";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleSearchChange = (e) => {
    const filter = e.target.value.toLowerCase();

    if (filter.length === 0) {
      setFiltered([]);
      return;
    }

    const filterResult = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter)
    );

    setFiltered(filterResult);
  };

  return (
    <div>
      <SearchInput onChange={handleSearchChange} />

      <DisplayResults countries={filtered} />
    </div>
  );
};

export default App;
