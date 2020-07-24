import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";

import CountryFilter from "./Components/CountryFilter/CountryFilter";
import CountryList from "./Components/CountryList/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter)
  );

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      const data = response.data;
      setCountries(data);
    });
  }, []);

  return (
    <div>
      <CountryFilter changed={handleChange} value={filter} />
      <CountryList filtered={filteredCountries} />
    </div>
  );
}

export default App;
