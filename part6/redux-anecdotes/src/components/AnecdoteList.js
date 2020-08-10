import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addVote } from "../reducers/anecdoteReducer";
import { showMessage, clearMessage } from "../reducers/messageReducer";

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(filter);
  });

  const vote = (id, content) => {
    dispatch(addVote(id));
    dispatch(showMessage(`You voted for ${content}`, 5));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
  };

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
