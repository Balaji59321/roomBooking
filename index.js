const express = require("express");
const app = express();
const mongo = require("./db");
const routePath = require("./modules/room");
const roomBook = require("./modules/roomBook");
const dotenv = require("dotenv");
dotenv.config();
mongo.connect();

app.use(express.json());

app.use("/", (req, res, next) => {
  //   res.send("hello");
  console.log("middleware");
  next();
});

// room api
app.use("/room", routePath);

// book a room api
app.use("/book", roomBook);

// error middleware
app.use((err, req, res, next) => {
  res.send({
    message: "Something went wrong" + err,
  });
});

app.listen(process.env.PORT || 3010);
