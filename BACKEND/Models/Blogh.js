const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bloghSchema = new Schema({
  blogtitle: {
    type: String,
    required: true,
  },
  authorname: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  blogsummary: {
    type: String,
    required: true,
  },
  blogbody: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Blogh = mongoose.model("Blogh", bloghSchema);
module.exports = Blogh;
