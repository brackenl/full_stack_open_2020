import React from "react";

import Blog from "./Blog";

const BlogDeck = (props) => {
  const sortedBlogs = props.blogs.sort((a, b) => b.likes - a.likes);
  return (
    <div>
      <p>Hello, {props.user.name}</p>
      <h3>Blogs</h3>
      {sortedBlogs
        ? sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              like={props.like}
              delBlog={props.delBlog}
            />
          ))
        : null}
    </div>
  );
};

export default BlogDeck;
