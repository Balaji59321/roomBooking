const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongo = require("./db");
const routePath = require("./modules/room");
const roomBook = require("./modules/roomBook");

dotenv.config();
mongo.connect();

app.use(cors());
app.use(express.json());

app.use("/", (req, res, next) => {
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

// server message
app.listen(process.env.PORT || 3010, () => {
  console.log("Server Started Successfully");
});
