import React, { useEffect } from "react";

import Comments from "./Comments";

const SingleBlog = ({ blog, like, newComment, comments, getComments }) => {
  useEffect(() => {
    if (blog) {
      getComments(blog.id);
    }
  }, [blog]);

  if (!blog) {
    return <div className="loader">Loading...</div>;
  }

  const addLike = (e) => {
    e.preventDefault();
    const updatedBlog = {
      ...blog,
      likes: (blog.likes += 1),
    };
    like(updatedBlog);
  };

  return (
    <div>
      <h3>{blog.title}</h3>
      <a href={blog.url}>
        <p>{blog.url}</p>
      </a>
      <p>{blog.likes} likes</p> <button onClick={addLike}>like</button>
      <p>by {blog.author}</p>
      <Comments comments={comments} newComment={newComment} id={blog.id} />
    </div>
  );
};

export default SingleBlog;
