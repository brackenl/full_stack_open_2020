import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.label}</button>;
};

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.metric}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (feedback) => {
    switch (feedback) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        console.log("not valid");
        break;
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={() => handleClick("good")} label="good" />
        <Button handleClick={() => handleClick("neutral")} label="neutral" />
        <Button handleClick={() => handleClick("bad")} label="bad" />
      </div>
      <br />
      {good + neutral + bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <Statistic metric="good" value={good} />
          <Statistic metric="neutral" value={neutral} />
          <Statistic metric="bad" value={bad} />
          <Statistic metric="all" value={good + neutral + bad} />
          <Statistic
            metric="average"
            value={((bad * -1 + good) / (good + neutral + bad)).toFixed(2)}
          />
          <Statistic
            metric="positive"
            value={((good / (good + neutral + bad)) * 100).toFixed(2) + "%"}
          />
        </table>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
