const { MongoClient } = require("mongodb");

module.exports = {
  currentDB: {},
  async connect() {
    try {
      const resp = await MongoClient.connect(process.env.MONGO_DB);
      this.currentDB = resp.db("roomBooking");
      //   console.log(this.currentDB);
    } catch (err) {
      console.log("Error", err);
    }
  },
};
