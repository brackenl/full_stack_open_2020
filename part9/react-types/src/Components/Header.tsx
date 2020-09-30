import React from "react";

const Header: React.FC<{ courseName: string }> = (props) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  );
};

export default Header;
