require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let SECRET = "THIS_IS_THE_SECRET";

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
};
