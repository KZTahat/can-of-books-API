"use strict";
const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  img: String,
});
const userSchema = new mongoose.Schema({
  email: String,
  books: [bookSchema],
});

const bookModel = mongoose.model("book", bookSchema);
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
