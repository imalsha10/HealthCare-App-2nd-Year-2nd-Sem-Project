const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const studentSchema = new Schema({

      name : {
         type : String,
         required : true
      },
      description : {
         type : String,
         required : true
      },
      price : {
         type : Number,
         required : true
      },
      quantity : {
         type : Number,
         required : true
      }

})

const Drug = mongoose.model("Drug",studentSchema);

module.exports = Drug;