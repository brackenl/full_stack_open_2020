import React, { useState } from "react";

import Button from "../Button/Button";
import CountryFull from "../CountryFull/CountryFull";

const Country = (props) => {
  const [showFullData, setShowFullData] = useState(false);

  const handleClick = () => {
    setShowFullData(!showFullData);
  };

  let countryData = (
    <li>
      {props.country.name} <Button clicked={handleClick} label="show" />
    </li>
  );

  if (showFullData) {
    countryData = (
      <div>
        <li>
          {props.country.name} <Button clicked={handleClick} label="hide" />
        </li>
        <CountryFull country={props.country} />
      </div>
    );
  }

  return countryData;
};

export default Country;
