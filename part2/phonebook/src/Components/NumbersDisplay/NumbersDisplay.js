import React from "react";

import Number from "./Number/Number";

const NumbersDisplay = ({ filteredPersons, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Number key={person.name} person={person} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default NumbersDisplay;
