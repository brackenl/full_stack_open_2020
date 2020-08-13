const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Blog = require("../models/blog");

const { usersInDb } = require("../utils/test_helper");

const app = require("../app");

const api = supertest(app);

describe("GET api/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("returns an array of users", async () => {
    const usersAtStart = await usersInDb();
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/users");

    expect(res.body).toHaveLength(usersAtStart.length);
  });
});

describe("POST api/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creating a new user is successful when valid user information is provided", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    const usernames = usersAtEnd.map((user) => user.username);

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(usernames).toContain(newUser.username);
  });

  test("user creation fails when invalid username provided", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "ml",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await usersInDb();
    const usernames = usersAtEnd.map((user) => user.username);

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    expect(usernames).not.toContain(newUser.username);
  });

  test("user creation fails when invalid password provided", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "sa",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await usersInDb();
    const usernames = usersAtEnd.map((user) => user.username);

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    expect(usernames).not.toContain(newUser.username);
  });
});
