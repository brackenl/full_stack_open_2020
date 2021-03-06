const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

//GET

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  res.json(users);
});

//POST

usersRouter.post("/", async (req, res) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

  if (req.body.password.length < 3) {
    res
      .status(400)
      .json({
        error: "password is too short - it must be at least 3 characters",
      });
  }

  const user = new User({
    username: req.body.username,
    name: req.body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

module.exports = usersRouter;
