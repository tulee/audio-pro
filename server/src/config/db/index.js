const mongoose = require("mongoose");
class databse {
  constructor() {}
  connect = async () => {
    await mongoose.connect(
      "mongodb+srv://admin:1234567890@cluster01.hgzawgg.mongodb.net/audio-pro?retryWrites=true&w=majority"
    );
  };
}

module.exports = databse;