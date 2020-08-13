const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const Blog = require("../models/blog");
const User = require("../models/user");

const app = require("../app");

const api = supertest(app);

const { initialBlogs } = require("../utils/test_helper");

let userId = "";
let userToken = "";

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("GET", () => {
  test("receives an array of blog posts", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/blogs");
    const contents = res.body.map((r) => r.title);

    expect(res.body).toHaveLength(initialBlogs.length);
    expect(contents).toContain("A random blog post 2");
  });

  test("id is a defined property on the returned objects", async () => {
    const res = await api.get("/api/blogs");

    expect(res.body[0]).toBeDefined();
  });
});

describe("POST", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
    userId = user._id;

    const res = await api.post("/api/login").send({
      username: "root",
      password: "secret",
    });
    userToken = res.body.token;
  });

  test("creates a new blog post", async () => {
    const newBlog = {
      title: "The new blog post",
      author: "An author",
      url: "www.blog.com",
      likes: 32,
      userId: userId,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${userToken}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/blogs");
    const contents = res.body.map((r) => r.title);

    expect(res.body).toHaveLength(initialBlogs.length + 1);
    expect(contents).toContain("The new blog post");
  });

  test("defaults to 0 likes if likes are not specified", async () => {
    const newBlog = {
      title: "The new blog post",
      author: "An author",
      url: "www.blog.com",
      userId: userId,
    };

    const res = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${userToken}`)
      .send(newBlog);

    expect(res.body.likes).toEqual(0);
  });

  test("rejects a blog post with no title/author", async () => {
    const newBlog = {
      author: "An author",
      url: "www.blog.com",
      userId: userId,
    };

    const newBlog2 = {
      title: "The new blog post",
      author: "An author",
      userId: userId,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${userToken}`)
      .send(newBlog)
      .expect(400);
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${userToken}`)
      .send(newBlog2)
      .expect(400);
  });

  test("rejects a blog post where the submitting user is not authenticated", async () => {
    const newBlog = {
      author: "An author",
      url: "www.blog.com",
      userId: userId,
    };
    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

describe("DELETE", () => {
  let res = "";

  beforeEach(async () => {
    const testBlog = {
      title: "To be deleted",
      author: "An author",
      url: "www.blog.com",
      userId: userId,
    };

    res = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${userToken}`)
      .send(testBlog);
  });

  test("a single post can be deleted where the user requesting deletion is the author", async () => {
    await api
      .delete(`/api/blogs/${res.body.id}`)
      .set("Authorization", `bearer ${userToken}`)
      .expect(204);

    const allBlogs = await api.get("/api/blogs");
    const contents = allBlogs.body.map((r) => r.title);

    expect(allBlogs.body).toHaveLength(initialBlogs.length);
    expect(contents).not.toContain("To be deleted");
  });

  test("a single post cannot be deleted by a user who is not the author", async () => {
    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "not_author", passwordHash });

    await user.save();
    userId = user._id;

    const resp = await api.post("/api/login").send({
      username: "not_author",
      password: "secret",
    });
    userToken = resp.body.token;

    await api
      .delete(`/api/blogs/${res.body.id}`)
      .set("Authorization", `bearer ${userToken}`)
      .expect(403);

    const allBlogs = await api.get("/api/blogs");
    const contents = allBlogs.body.map((r) => r.title);

    expect(allBlogs.body).toHaveLength(initialBlogs.length + 1);
    expect(contents).toContain("To be deleted");
  });
});

describe("PUT", () => {
  test("updates an existing post", async () => {
    let res = await api.get("/api/blogs");
    const relId = res.body[0].id;

    const amendedBlog = {
      title: res.body[0].title,
      author: res.body[0].author,
      url: res.body[0].url,
      likes: res.body[0].likes + 1,
    };

    res = await api.put(`/api/blogs/${relId}`).send(amendedBlog);

    expect(res.body.likes).toEqual(amendedBlog.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
