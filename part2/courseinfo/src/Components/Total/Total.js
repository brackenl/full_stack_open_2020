import React from "react";

const Total = ({ course }) => {
  const sum = course.parts.reduce((a, b) => {
    return a + b.exercises;
  }, 0);
  return <p style={{ fontWeight: "bold" }}>Total exercises {sum}</p>;
};

export default Total;
