const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "A random blog post 1",
    author: "An author",
    url: "www.blog.com",
    likes: 47,
  },
  {
    title: "A random blog post 2",
    author: "An author",
    url: "www.blog.com",
    likes: 32,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
