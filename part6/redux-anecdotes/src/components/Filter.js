import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value.toLowerCase()));
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label>Filter: </label>
      <input
        onChange={handleChange}
        value={useSelector((state) => state.filter)}
      />
    </div>
  );
};

export default Filter;
