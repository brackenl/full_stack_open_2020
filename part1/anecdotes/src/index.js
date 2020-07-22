import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.label}</button>
);

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = () => {
    const copyVotes = { ...votes };
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  };

  let mostVotes = Object.keys(votes).reduce((a, b) =>
    votes[a] > votes[b] ? a : b
  );
  console.log(mostVotes);

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <div>{props.anecdotes[selected]}</div>
        <div>has {votes[selected]} votes</div>
        <div>
          <Button handleClick={handleVote} label="vote" />
          <Button handleClick={handleClick} label="next anecdote" />
        </div>
      </div>
      <div>
        <h1>Anecdote with the most votes</h1>
        <div>{props.anecdotes[mostVotes]}</div>
        <div>has {votes[mostVotes]} votes</div>
      </div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
