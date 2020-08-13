import React from "react";
import { useDispatch } from "react-redux";

import { setUsername, setPassword } from "../Reducers/loginReducer";

const LogInForm = (props) => {
  const dispatch = useDispatch();

  return (
    <form onSubmit={props.submit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="Username"
          id="username"
          onChange={(e) => dispatch(setUsername(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="Password"
          id="password"
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LogInForm;
