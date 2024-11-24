const mongoose = require("mongoose");

//create schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgPath: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
  },
});

//create model
const user = new mongoose.model("users", userSchema);

//export model
module.exports = user;
