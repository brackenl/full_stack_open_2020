import React from "react";

import { connect } from "react-redux";

import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (e) => {
    props.setFilter(e.target.value.toLowerCase());
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label>Filter: </label>
      <input onChange={handleChange} value={props.filter} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
