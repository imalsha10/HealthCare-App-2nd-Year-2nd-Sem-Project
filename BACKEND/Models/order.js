const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = new Schema({

      firstname : {
         type : String,
         required : true
      },
      lastname : {
         type : String,
         required : true
      },
      address : {
         type : String,
         required : true
      },
      phoNumber : {
         type : Number,
         required : true
      },
      healthCode : {
         type : String,
         required : true
      },
      noItems : {
         type : Number,
         required : true
      }

})

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;