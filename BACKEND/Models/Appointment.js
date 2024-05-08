const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    labService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabService",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: [
        "pending",
        "paid",
        "approved",
        "inProgress",
        "completed",
        "cancelled",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
