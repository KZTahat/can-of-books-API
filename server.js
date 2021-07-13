"use strict";

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { request, response, json } = require("express");
// const { userModel } = require("./Schemas");
const userModel = require("./Schemas");

require("dotenv").config();
const PORT = process.env.PORT;
const server = express();
server.use(cors());
server.use(express.json());

// Proof Of Life
server.get("/", (request, response) => {
  response.send(`it's Working`);
});

server.get("/books", getBooksData);

server.post("/addbook", addNewBook);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function seedUserModel() {
  const khaled = new userModel({
    email: "kztahat96@gmail.com",
    books: [
      {
        name: "The Growth Mindset",
        description:
          "Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.",
        status: "FAVORITE FIVE",
        img: "https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg",
      },
      {
        name: "The Momnt of Lift",
        description:
          "Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.",
        status: "RECOMMENDED TO ME",
        img: "https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg",
      },
      {
        name: "True Heart",
        description:
          "Everyone has experienced coming to a crossroads in their life. We’re all familiar with the feeling of having to decide between two different directions our lives could go--two different visions of our future. How do we pick between them? How do we know which one is the “right” path to take?",
        status: "RECOMMENDED TO ME",
        img: "https://images-na.ssl-images-amazon.com/images/I/41yWbSDgBDL._SX331_BO1,204,203,200_.jpg",
      },
    ],
  });
  khaled.save();
}
// seedUserModel();

function getBooksData(request, response) {
  let { email } = request.query;
  userModel.find({ email: email }, (error, userData) => {
    if (error) {
      response.send("something went wrong");
    } else {
      // console.log(userData[0].books);
      response.send(userData[0].books);
    }
  });
}

server.listen(PORT, () => {
  console.log(`LISTINING ON PORT ${PORT}`);
});

function addNewBook(req, res) {
  const { bookName, description, imgUrl, state, email } = req.body;
  userModel.find({ email: email }, (error, newData) => {
    if (error) {
      response.send("something went wrong POST");
    } else {
      newData[0].books.push({
        name: bookName,
        description: description,
        img: imgUrl,
        status: state,
      });
      console.log(newData[0].books);
      newData[0].save();
      res.send(newData[0].books);
    }
  });
}
