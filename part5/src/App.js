import React, { useState, useEffect } from "react";
import "./App.css";

import LogInForm from "./Components/LogInForm";
import BlogDeck from "./Components/BlogDeck";
import Button from "./Components/Button";
import NewBlogForm from "./Components/NewBlogForm";
import Notification from "./Components/Notification";

import loginService from "./Services/login";
import blogService from "./Services/blog";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);

  const getBlogs = async () => {
    const res = await blogService.getAll();
    setBlogs(res);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInBlogappUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedInBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      console.log("success");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleBlogSubmit = async (title, Url) => {
    const newBlog = {
      title: title,
      url: Url,
      author: user.name,
    };

    try {
      await blogService.create(newBlog);
      setSuccessMessage(
        `Blog ${newBlog.title} by ${newBlog.author} posted successfully`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      getBlogs();
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInBlogappUser");
    setUser(null);
    setUsername("");
    setPassword("");
  };

  const handleLike = async (updatedBlog) => {
    try {
      await blogService.update(updatedBlog.id, updatedBlog);
      getBlogs();
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id);
      setSuccessMessage("Blog deleted successfully");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      getBlogs();
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="App">
      <h1>Blog App</h1>
      {errorMessage ? (
        <Notification success={false} message={errorMessage} />
      ) : null}
      {successMessage ? (
        <Notification success={true} message={successMessage} />
      ) : null}
      {user ? (
        <BlogDeck
          user={user}
          blogs={blogs}
          like={handleLike}
          delBlog={handleDelete}
        />
      ) : (
        <LogInForm
          submit={handleUserSubmit}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
      {showNewBlogForm ? (
        <NewBlogForm
          submit={handleBlogSubmit}
          toggle={() => setShowNewBlogForm(false)}
        />
      ) : (
        <Button
          clicked={() => setShowNewBlogForm(true)}
          label="Create New Blog"
        />
      )}
      {user ? <Button clicked={handleLogOut} label="Log Out" /> : null}
    </div>
  );
};

export default App;
