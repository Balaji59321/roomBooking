const mongo = require("./../db");

// Methods to book a room
module.exports.bookRoom = async (req, res, next) => {
  const roomId = req.body.roomId;
  try {
    const room = await mongo.currentDB
      .collection("room")
      .find({ id: roomId })
      .toArray();

    let bookedCopy = room[0]["booked"];

    //  if room is not yet booked accept data and time passed by customer api without validation
    if (Object.keys(bookedCopy).length === 0) {
      let obj = {};
      obj[req.body.date] = [[req.body.startTime, req.body.endTime]];
      //   console.log(obj);
      const resp = await mongo.currentDB.collection("bookRoom").insertOne({
        booked: obj,
        ...req.body,
      });
      await mongo.currentDB
        .collection("room")
        .update({ id: roomId }, { $set: { booked: obj } });
      res.send(resp);
    } else {
      let flag = 0;
      for (i in bookedCopy) {
        if (i === req.body.date) {
          let counter = 0;
          // check for conflicting time and date
          for (let j = 0; j < bookedCopy[i].length; j++) {
            if (
              (bookedCopy[i][j][0].split(":")[0] <
                req.body.startTime.split(":")[0] &&
                bookedCopy[i][j][1].split(":")[0] <
                  req.body.endTime.split(":")[0]) ||
              (bookedCopy[i][j][0].split(":")[0] >
                req.body.startTime.split(":")[0] &&
                bookedCopy[i][j][1].split(":")[0] >
                  req.body.endTime.split(":")[0])
            ) {
              counter++;
            }
          }
          //    if no conflict then allow user to book a room based on user choice/payload
          if (counter === bookedCopy[i].length) {
            bookedCopy[i] = [
              ...bookedCopy[i],
              [req.body.startTime, req.body.endTime],
            ];
            flag++;
            const resp = await mongo.currentDB
              .collection("bookRoom")
              .insertOne({
                booked: {
                  [req.body.date]: [req.body.startTime, req.body.endTime],
                },
                ...req.body,
              });
            await mongo.currentDB
              .collection("room")
              .update({ id: roomId }, { $set: { booked: bookedCopy } });
            res.send(resp);
          } else {
            //  else throw a error that user cannot book a hall
            flag = -1;
            res.status(404).send({ message: "Slot already Booked" });
          }
          break;
        }
      }
      //   if no matching date is present then allow user to create a new room
      if (flag === 0) {
        let temp = {
          ...bookedCopy,
          [req.body.date]: [[req.body.startTime, req.body.endTime]],
        };
        const resp = await mongo.currentDB.collection("bookRoom").insertOne({
          booked: {
            [req.body.date]: [req.body.startTime, req.body.endTime],
          },
          ...req.body,
        });
        await mongo.currentDB
          .collection("room")
          .update({ id: roomId }, { $set: { booked: temp } });
        res.send(resp);
      }
    }
  } catch (err) {
    console.log("Error", err);
    next();
  }
};

// Methods to fetch data from the database
module.exports.cancelRoom = async (req, res, next) => {
  try {
    const resp = await mongo.currentDB
      .collection("room")
      .find({ id: +req.params.roomId })
      .toArray();

    // method to see if there is any matching record
    //  throw error and end if ther is not match
    if (!Object.keys(resp[0]["booked"]).includes(req.body.date))
      throw new Error("No Record to Delete");

    // filter out the data based on date and time passed with matching room
    const temp = {
      ...resp[0]["booked"],
      [req.body.date]: resp[0]["booked"][req.body.date].filter(
        (ele) => ele[0] !== req.body.startTime && ele[1] !== req.body.endTime
      ),
    };

    //  delete the empty value (key value pair)
    for (i in temp) {
      console.log(temp, i, temp[i], temp[i].length);
      temp[i].length == 0 && delete temp[i];
    }

    // update the latest value in the room collection
    await mongo.currentDB.collection("room").updateOne(
      { id: +req.params.roomId },
      {
        $set: {
          booked: temp.length === 0 ? {} : temp,
        },
      }
    );
    res.status(200).send({ code: 200, message: "deleted successfully" });
    // resp["deletedCount"] === 0
    //   ? res
    //       .status(404)
    //       .send({ code: 404, message: "no record found or invalid Id" })
    //   : res.status(200).send({ code: 200, message: "deleted successfully" });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

// Methods to fetch booked data by customers
module.exports.getBookingDetails = async (req, res, next) => {
  try {
    const resp = await mongo.currentDB.collection("bookRoom").find().toArray();
    res.send(resp);
  } catch (err) {
    console.log("Error", err);
  }
};

// Methods to fetch room details
// module.exports.getCustomerDetails = async (req, res, next) => {
//   try {
//     const resp = await mongo.currentDB
//       .collection("bookRoom")
//       .aggregate([
//         {
//           $lookup: {
//             from: "room",
//             localField: "roomId",
//             foreignField: "id",
//             as: "Data",
//           },
//         },
//         {
//           $project: {
//             name: 1,
//             date: 1,
//             roomId: 1,
//             startTime: 1,
//             endTime: 1,
//             roomName: { $arrayElemAt: ["$Data.name", 0] },
//             _id: 0,
//           },
//         },
//       ])
//       .toArray();
//     res.send(resp);
//   } catch (err) {
//     console.log("Error", err);
//   }
// };

// Methods to get the room details
// module.exports.getRoomDetails = async (req, res, next) => {
//   try {
//     const resp = await mongo.currentDB
//       .collection("bookRoom")
//       .aggregate([
//         {
//           $lookup: {
//             from: "room",
//             localField: "roomId",
//             foreignField: "id",
//             as: "room data",
//           },
//         },
//         {
//           $project: {
//             name: 1,
//             date: 1,
//             roomId: 1,
//             roomName: { $arrayElemAt: ["$room data.name", 0] },
//             booked: { $arrayElemAt: ["$room data.booked", 0] },
//             startTime: 1,
//             endTime: 1,
//             _id: 0,
//           },
//         },
//       ])
//       .toArray();
//     // console.log(await resp.toArray());
//     res.send(resp);
//   } catch (err) {
//     res.send(JSON.stringify({ message: "Something went wrong" }));
//     // console.log("Error", err);
//   }
// };
