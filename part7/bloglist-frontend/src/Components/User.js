import React from "react";
import { Link } from "react-router-dom";

const User = ({ user, blogs }) => {
  let userBlogs;

  if (!user || !blogs) {
    return <div className="loader">Loading...</div>;
  }

  if (user && blogs) {
    const blogsWithinfo = blogs.filter((blog) => blog.user);
    userBlogs = blogsWithinfo.filter((blog) => blog.user.id === user.id);
  }

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <h3>{user.name}</h3>
      <p style={{ textAlign: "left" }}>Blogs by {user.name}:</p>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
