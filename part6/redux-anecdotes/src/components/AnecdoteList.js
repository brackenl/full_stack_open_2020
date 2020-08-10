import React from "react";
import { connect } from "react-redux";

import { addVote } from "../reducers/anecdoteReducer";
import { showMessage } from "../reducers/messageReducer";

const AnecdoteList = (props) => {
  const sortedAnecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes);
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(props.filter);
  });

  const vote = (id, content) => {
    props.addVote(id);
    props.showMessage(`You voted for ${content}`, 5);
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  addVote,
  showMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
