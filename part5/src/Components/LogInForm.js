import React from "react";

const logInForm = (props) => {
  return (
    <form onSubmit={props.submit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="Username"
          id="username"
          onChange={(e) => props.setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="Password"
          id="password"
          onChange={(e) => props.setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default logInForm;
