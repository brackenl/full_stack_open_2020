import React, { useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

// import Button from "./Button";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "5px",
    display: "inline-block",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: "0 5px",
  },
});

const Blog = ({ blog, like, delBlog }) => {
  const classes = useStyles();
  const [viewToggle, setViewToggle] = useState("");

  const toggleDetail = () => {
    setViewToggle(!viewToggle);
  };

  const addLike = (e) => {
    e.preventDefault();
    const updatedBlog = {
      ...blog,
      likes: (blog.likes += 1),
    };
    like(updatedBlog);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const result = window.confirm(
      `Are you sure you want to delete ${blog.title} by ${blog.author}?`
    );
    if (result) {
      delBlog(blog.id);
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <h4>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </h4>
        <p>by {blog.author}</p>
        <Button
          onClick={toggleDetail}
          className="detailToggle"
          size="small"
          variant="contained"
        >
          {viewToggle ? "hide" : "view"}
        </Button>
        <div
          style={{ display: viewToggle ? "block" : "none" }}
          className="detailContainer"
        >
          <p>{blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <Button
            className={classes.button}
            onClick={addLike}
            variant="contained"
            color="primary"
          >
            Like
          </Button>
          <Button
            className={classes.button}
            onClick={handleDelete}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Blog;
