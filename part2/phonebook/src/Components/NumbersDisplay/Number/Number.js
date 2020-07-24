import React from "react";

const Number = ({ person, handleDelete }) => {
  return (
    <div className="number">
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>
  );
};

export default Number;
