const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const doctorSchema = new Schema({

    id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    specialty: {

        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },

})
const doctor = mongoose.model("doctor", doctorSchema);

module.exports = doctor;