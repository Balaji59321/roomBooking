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

app.use("/room", routePath);
app.use("/book", roomBook);

app.listen(process.env.PORT || 3010);
