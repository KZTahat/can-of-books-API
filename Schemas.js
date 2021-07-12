"use strict";
const mongoose = require("mongoose");

let utilities = {};

utilities.bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  img: String,
});
utilities.userSchema = new mongoose.Schema({
  email: String,
  books: [utilities.bookSchema],
});

utilities.bookModel = mongoose.model("book", utilities.bookSchema);
utilities.userModel = mongoose.model("user", utilities.userSchema);

module.exports = utilities;
