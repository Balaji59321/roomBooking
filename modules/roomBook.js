const express = require("express");
const route = express.Router();
const book = require("./../routes/roomBooks");

// Api to book a room
route.post("/create", book.bookRoom);

// Api to get the customer details who booked the room
route.get("/getRoom", book.getBookingDetails);

// Api to cancel the room subscription
route.delete("/delete/:roomId", book.cancelRoom);

// route.get("/getDetails", book.getRoomDetails);
// route.get("/getCustomerDetails", book.getCustomerDetails);

module.exports = route;
