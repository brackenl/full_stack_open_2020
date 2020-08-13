import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./App.css";

import { Container, Button } from "@material-ui/core";

import LogInForm from "./Components/LogInForm";
import BlogDeck from "./Components/BlogDeck";
// import Button from "./Components/Button";
import NewBlogForm from "./Components/NewBlogForm";
import Notification from "./Components/Notification";
import Users from "./Components/Users";
import User from "./Components/User";
import SingleBlog from "./Components/SingleBlog";
import NavBar from "./Components/NavBar";

import loginService from "./Services/login";
import blogService from "./Services/blog";
import userService from "./Services/user";

import { clearForm } from "./Reducers/loginReducer";
import { setUser, clearUser } from "./Reducers/userReducer";
import { setAllBlogs } from "./Reducers/blogReducer";
import { setMessage, clearMessage } from "./Reducers/messageReducer";

const App = () => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password);
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const message = useSelector((state) => state.message);

  const [showNewBlogForm, setShowNewBlogForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  const getBlogs = async () => {
    const res = await blogService.getAll();
    dispatch(setAllBlogs(res));
  };

  const getUsers = async () => {
    const res = await userService.getAll();
    const userArr = [];
    res.forEach((obj) => {
      userArr.push(obj);
    });
    setUsers(userArr);
  };

  const getComments = async (id) => {
    const res = await blogService.getAllComments(id);
    setComments(res);
  };

  useEffect(() => {
    getBlogs();
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInBlogappUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      dispatch(setUser(user));
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
      dispatch(setUser(user));
      dispatch(clearForm());
    } catch (error) {
      dispatch(setMessage("Wrong credentials", false));
      setTimeout(() => {
        dispatch(clearMessage());
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
      dispatch(
        setMessage(
          `Blog ${newBlog.title} by ${newBlog.author} posted successfully`,
          true
        )
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
      getBlogs();
    } catch (error) {
      dispatch(setMessage(error.message, false));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInBlogappUser");
    dispatch(setUser(null));
    dispatch(clearUser());
  };

  const handleLike = async (updatedBlog) => {
    const reqObj = {
      title: updatedBlog.title,
      author: updatedBlog.author,
      url: updatedBlog.url,
      likes: updatedBlog.likes,
    };
    try {
      await blogService.update(updatedBlog.id, reqObj);
      getBlogs();
    } catch (error) {
      dispatch(setMessage(error.message, false));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id);
      dispatch(setMessage("Blog deleted successfully", true));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
      getBlogs();
    } catch (error) {
      dispatch(setMessage(error.message, false));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  };

  const handleNewComment = async (id, content) => {
    try {
      await blogService.createComment(id, content);
      dispatch(setMessage("Comment added successfully", true));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
      getComments(id);
    } catch (error) {
      dispatch(setMessage(error.message, false));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  };

  const userMatch = useRouteMatch("/users/:id");
  const relUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useRouteMatch("/blogs/:id");
  const relBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  return (
    <div className="App" style={{ backgroundColor: "rgb(245, 245, 245)" }}>
      <Container maxWidth="lg">
        <NavBar user={user} />
        <h1>Blog App</h1>
        <Switch>
          <Route path="/blogs/:id">
            <SingleBlog
              blog={relBlog}
              like={handleLike}
              newComment={handleNewComment}
              getComments={getComments}
              comments={comments}
            />
          </Route>
          <Route path="/users/:id">
            <User user={relUser} blogs={blogs} />
          </Route>
          <Route path="/users">
            <Users users={users} />
          </Route>
          <Route path="/">
            {message ? (
              <Notification success={message.success} message={message.text} />
            ) : null}
            {user ? (
              <BlogDeck
                user={user}
                blogs={blogs}
                like={handleLike}
                delBlog={handleDelete}
              />
            ) : (
              <LogInForm submit={handleUserSubmit} />
            )}
            {showNewBlogForm ? (
              <NewBlogForm
                submit={handleBlogSubmit}
                toggle={() => setShowNewBlogForm(false)}
              />
            ) : (
              <Button
                variant="contained"
                onClick={() => setShowNewBlogForm(true)}
                size="small"
                style={{ margin: "10px 5px" }}
              >
                Create New Blog
              </Button>
            )}
            {user ? (
              <Button
                variant="contained"
                onClick={handleLogOut}
                size="small"
                style={{ margin: "10px 5px" }}
              >
                Log Out
              </Button>
            ) : null}
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
