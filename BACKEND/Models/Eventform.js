const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventformSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  eventid: {
    type: String,
    required: true,
  },
});

const Eventform = mongoose.model("Eventform", eventformSchema);
module.exports = Eventform;
