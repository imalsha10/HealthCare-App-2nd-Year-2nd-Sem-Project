const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = new Schema({
   
   
      orderId : {
         type : String,
         required : true
      },
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
         type : String,
         required : true
      },
      healthCode : {
         type : String,
         required : false
      },
      itemNames : {
         type : String,
         required : true
      },
      amount : {
         type : Number,
         required : true
      }

})

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;