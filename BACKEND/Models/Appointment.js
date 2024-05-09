const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    address: {
        required: true,
        type: String,
    },
    nic: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    contactNo: {
        required: true,
        type: String,
    },

    date: {
        required: true,
        type: Date,
    },
    reasonForVisit: {
        required: true,
        type: String,
    },
    availableTimeslots: {
        type: String,
    },
    doctorId: {
        required: true,
        type: String,
    },
    doctorName: {
        required: true,
        type: String,
    },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;