import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../queries";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      const favGenre = result.data.login.genre;
      props.setToken(token);
      localStorage.setItem("library-user-token", token);
      props.setGenre(favGenre);
    }
  }, [result.data]); // eslint-disable-line

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } }).then((val) => {
      props.setPage("authors");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ margin: "10px 0" }}>
        <label>username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginLeft: "5px" }}
        ></input>
      </div>
      <div style={{ margin: "10px 0" }}>
        <label>password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginLeft: "5px" }}
        ></input>
      </div>
      <button type="submit" style={{ margin: "10px 0" }}>
        login
      </button>
    </form>
  );
};

export default LoginForm;
