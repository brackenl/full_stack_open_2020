import React, { useState } from "react";

import Country from "../Country/Country";
import CountryFull from "../CountryFull/CountryFull";

const CountryList = (props) => {
  // const [filteredCountries, setCountryList] = useState(props.filtered);

  if (props.filtered && props.filtered.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (props.filtered && props.filtered.length === 1) {
    return <CountryFull country={props.filtered[0]} />;
  }

  return (
    <ul>
      {props.filtered.map((country) => {
        return (
          <Country
            key={country.alpha3Code}
            country={country}
            // clicked={() => handleClick(country.alpha3Code)}
          />
        );
      })}
    </ul>
  );
};

export default CountryList;
