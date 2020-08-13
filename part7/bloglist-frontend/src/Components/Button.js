import React from "react";

const defaultStyle = {
  color: "black",
  borderRadius: "5px",
};

const dangerStyle = {
  backgroundColor: "red",
  color: "white",
  borderRadius: "5px",
};

const Button = (props) => (
  <div style={{ margin: "10px" }}>
    <button
      onClick={props.clicked}
      style={props.bgColour ? dangerStyle : defaultStyle}
    >
      {props.label}
    </button>
  </div>
);

export default Button;
