import React from "react";
import ReactDOM from "react-dom";

import { CoursePart } from "./types";

import Header from "./Components/Header";
import Content from "./Components/Content";
import Total from "./Components/Total";
import Part from "./Components/Part";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },

    {
      name: "Another part",
      exerciseCount: 1,
      description: "Just another regular part",
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
      {courseParts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
