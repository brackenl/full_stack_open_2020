import React from "react";

const CountryFilter = (props) => {
  return (
    <div>
      <span>find countries</span>
      <input
        style={{ marginLeft: "15px" }}
        onChange={props.changed}
        value={props.value}
      />
    </div>
  );
};

export default CountryFilter;
