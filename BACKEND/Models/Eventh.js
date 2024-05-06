const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventhSchema = new Schema({
  eventcode: {
    type: String,
    required: true,
  },
  eventtitle: {
    type: String,
    required: true,
  },
  eventauthorname: {
    type: String,
    required: true,
  },

  eventdate: {
    type: String,
    required: true,
  },
  eventsummary: {
    type: String,
    required: true,
  },
  eventbody: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Eventh = mongoose.model("Eventh", eventhSchema);
module.exports = Eventh;
