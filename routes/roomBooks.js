const { ObjectId } = require("mongodb");
const mongo = require("./../db");

module.exports.bookRoom = async (req, res, next) => {
  const roomId = req.body.roomId;
  console.log(roomId);

  try {
    const room = await mongo.currentDB
      .collection("room")
      .find({ id: roomId })
      .toArray();
    console.log(room[0]["booked"]);
    if (room[0]["booked"] === true) {
      res.send({ message: "Already Booked" });
    } else {
      const resp = await mongo.currentDB
        .collection("bookRoom")
        .insertOne(req.body);
      res.send(resp);
      await mongo.currentDB
        .collection("room")
        .updateOne(
          { _id: ObjectId("6276b8634dc2fb6eb360dc09") },
          { $set: { booked: true } }
        );
    }
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports.getRoomDetails = async (req, res, next) => {
  try {
    const resp = await mongo.currentDB
      .collection("bookRoom")
      .aggregate([
        {
          $lookup: {
            from: "room",
            localField: "roomId",
            foreignField: "id",
            as: "room data",
          },
        },
        {
          $project: {
            name: 1,
            date: 1,
            roomId: 1,
            roomName: { $arrayElemAt: ["$room data.name", 0] },
            booked: { $arrayElemAt: ["$room data.booked", 0] },
            startTime: 1,
            endTime: 1,
            _id: 0,
          },
        },
      ])
      .toArray();
    // console.log(await resp.toArray());
    res.send(resp);
  } catch (err) {
    res.send(JSON.stringify({ message: "Something went wrong" }));
    // console.log("Error", err);
  }
};

module.exports.cancelRoom = async (req, res, next) => {
  try {
    const resp = await mongo.currentDB
      .collection("bookRoom")
      .deleteOne({ roomId: req.params.roomId });
    res.send(resp);
    await mongo.currentDB
      .collection("room")
      .updateOne(
        { id: ObjectId("6276b8634dc2fb6eb360dc09") },
        { $set: { booked: true } }
      );
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports.getBookingDetails = async (req, res, next) => {
  try {
    const resp = await mongo.currentDB.collection("bookRoom").find().toArray();
    res.send(resp);
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports.getCustomerDetails = async (req, res, next) => {
  try {
    const resp = await mongo.currentDB
      .collection("bookRoom")
      .aggregate([
        {
          $lookup: {
            from: "room",
            localField: "roomId",
            foreignField: "id",
            as: "Data",
          },
        },
        {
          $project: {
            name: 1,
            date: 1,
            roomId: 1,
            startTime: 1,
            endTime: 1,
            roomName: { $arrayElemAt: ["$Data.name", 0] },
            _id: 0,
          },
        },
      ])
      .toArray();
    res.send(resp);
  } catch (err) {
    console.log("Error", err);
  }
};
