const express = require("express");
const route = express.Router();
const data = require("./../routes/room");

route.get("/get", data.viewRoom);
route.post("/create", data.createRoom);
route.delete("/remove/:id", data.deleteRoom);
route.put("/update/:id", data.updateRoom);

module.exports = route;
