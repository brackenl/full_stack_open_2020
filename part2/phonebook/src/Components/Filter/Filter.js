import React from "react";

const Filter = (props) => {
  return (
    <div>
      filter: <input onChange={props.handleFilterChange} value={props.filter} />
    </div>
  );
};

export default Filter;
