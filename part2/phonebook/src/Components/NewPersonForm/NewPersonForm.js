import React from "react";

const NewPersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <h2>Add new</h2>
      <div>
        name: <input onChange={props.handleNameChange} value={props.newName} />
      </div>
      <div style={{ marginTop: "5px" }}>
        number: <input onChange={props.handleNumChange} value={props.newNum} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default NewPersonForm;
