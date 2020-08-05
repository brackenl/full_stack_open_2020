import React, { useState } from "react";

import Button from "./Button";

const Blog = ({ blog, like, delBlog }) => {
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
    <div
      style={{
        width: "30%",
        display: "inline-block",
        margin: "10px",
        padding: "5px",
        border: "1px solid black",
      }}
      className="blogCard"
    >
      <h4>{blog.title}</h4>
      <p>by {blog.author}</p>
      <button onClick={toggleDetail} className="detailToggle">
        {viewToggle ? "hide" : "view"}
      </button>
      <div
        style={{ display: viewToggle ? "block" : "none" }}
        className="detailContainer"
      >
        <p>{blog.url}</p>
        <p>Likes: {blog.likes}</p>
        <Button clicked={addLike} label="Like" />
        <Button clicked={handleDelete} label="Delete" bgColour="red" />
      </div>
    </div>
  );
};

export default Blog;
