import React from "react";
import { useDispatch } from "react-redux";

import { newAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const newQuote = async (e) => {
    e.preventDefault();
    const content = e.target.quotefield.value;
    e.target.quotefield.value = "";
    dispatch(newAnecdote(content));
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

export default AnecdoteForm;
