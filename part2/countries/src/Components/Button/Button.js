import React from "react";

const Button = (props) => {
  return <button onClick={props.clicked}>{props.label}</button>;
};

export default Button;
