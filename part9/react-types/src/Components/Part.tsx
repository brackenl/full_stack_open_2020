import React from "react";

import { CoursePart } from "../types";

const Part: React.FC<{ part: CoursePart }> = (props) => {
  const style = {
    border: "1px solid black",
    margin: "10px auto",
    padding: "5px 5px",
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.part.name) {
    case "Fundamentals":
      return (
        <div style={style}>
          <p>Name: {props.part.name}</p>
          <p>Exercise count: {props.part.exerciseCount}</p>
          <p>Description: {props.part.description}</p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div style={style}>
          <p>Name: {props.part.name}</p>
          <p>Exercise count: {props.part.exerciseCount}</p>
          <p>Group project count: {props.part.groupProjectCount}</p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div style={style}>
          <p>Name: {props.part.name}</p>
          <p>Exercise count: {props.part.exerciseCount}</p>
          <p>Description: {props.part.description}</p>
          <p>Exercise submission link: {props.part.exerciseSubmissionLink}</p>
        </div>
      );
    case "Another part":
      return (
        <div style={style}>
          <p>Name: {props.part.name}</p>
          <p>Exercise count: {props.part.exerciseCount}</p>
          <p>Description: {props.part.description}</p>
        </div>
      );
    default:
      return assertNever(props.part);
  }
};

export default Part;
