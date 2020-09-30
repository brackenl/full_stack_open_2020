import React from "react";

import { CoursePart } from "../types";

const Total: React.FC<{ courseParts: CoursePart[] }> = (props) => {
  return (
    <p>
      Number of exercises{" "}
      <b>
        {props.courseParts.reduce(
          (carry, part) => carry + part.exerciseCount,
          0
        )}
      </b>
    </p>
  );
};

export default Total;
