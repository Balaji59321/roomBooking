const mongo = require("./../db");
const { ObjectId } = require("mongodb");

module.exports.viewRoom = async (req, res, next) => {
  try {
    const resp = await mongo.currentDB.collection("room").find({}).toArray();
    // console.log(resp);
    res.send(resp);
  } catch (err) {
    console.log("ERROR", err);
  }
};

module.exports.createRoom = async (req, res, next) => {
  try {
    const resp = await mongo.currentDB.collection("room").insertOne(req.body);
    res.send(resp);
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports.updateRoom = async (req, res, next) => {
  try {
    const resp = await mongo.currentDB
      .collection("room")
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: { ...req.body } });
    res.send(resp);
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports.deleteRoom = async (req, res, next) => {
  try {
    const resp = await mongo.currentDB
      .collection("room")
      .deleteOne({ _id: ObjectId(req.params.id) });
    res.send(resp);
  } catch (err) {
    console.log("Error" + err);
  }
};
