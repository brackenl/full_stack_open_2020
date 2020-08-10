import React from "react";
import { connect } from "react-redux";

import { newAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const newQuote = async (e) => {
    e.preventDefault();
    const content = e.target.quotefield.value;
    e.target.quotefield.value = "";
    props.newAnecdote(content);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newQuote}>
        <div>
          <input name="quotefield" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  newAnecdote,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
