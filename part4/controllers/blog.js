const app = require("express");
const jwt = require("jsonwebtoken");
const blogsRouter = app.Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

// GET

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

// POST

blogsRouter.post("/", async (request, response) => {
  console.log("in blog POST");
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    console.log("in here");
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  console.log(user);

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id,
  });
  console.log(blog);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

// DELETE

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const relBlog = await Blog.findById(request.params.id);

  if (decodedToken.id.toString() !== relBlog.user.toString()) {
    return response
      .status(403)
      .json({ error: "Only the author of a blog post may delete it." });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// PUT

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
