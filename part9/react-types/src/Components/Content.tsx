import React from "react";

import { CoursePart } from "../types";

const Content: React.FC<{ courseParts: CoursePart[] }> = (props) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <p>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
