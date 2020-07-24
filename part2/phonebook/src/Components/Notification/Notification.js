import React from "react";

const successStyle = {
  color: "green",
  fontSize: "1.2rem",
  background: "lightgray",
  border: "3px solid green",
  width: "80%",
};

const errorStyle = {
  color: "red",
  fontSize: "1.2rem",
  background: "lightgray",
  border: "3px solid red",
  width: "80%",
};

const Notification = (props) => {
  if (props.notification) {
    return (
      <div style={props.notification.error ? errorStyle : successStyle}>
        <h1 className="notification">{props.notification.message}</h1>
      </div>
    );
  } else {
    return null;
  }
};

export default Notification;
