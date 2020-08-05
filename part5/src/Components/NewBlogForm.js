import React, { useState } from "react";
import PropTypes from "prop-types";

const NewBlogForm = (props) => {
  const [title, setTitle] = useState("");
  const [Url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    props.submit(title, Url);
    setTitle("");
    setUrl("");
  };

  return (
    <div style={{ marginBottom: "20px" }} className="formDiv">
      <h3>New blog</h3>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="titleInput"
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            value={Url}
            onChange={(e) => setUrl(e.target.value)}
            className="urlInput"
          />
        </div>
        <button type="submit">Submit Blog</button>
        <button onClick={props.toggle}>Cancel</button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  submit: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default NewBlogForm;
