const express = require("express");
const route = express.Router();
const book = require("./../routes/roomBooks");

route.post("/create", book.bookRoom);
route.get("/getRoom", book.getBookingDetails);
route.delete("/delete/:roomId", book.cancelRoom);
route.get("/getDetails", book.getRoomDetails);
route.get("/getCustomerDetails", book.getCustomerDetails);

module.exports = route;
