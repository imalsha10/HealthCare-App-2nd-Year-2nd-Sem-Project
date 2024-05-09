const express = require("express");
let Appointment = require("../Models/Appointment");

const router = express.Router();

// Add appointments
router.post("/addapp", async(req, res) => {
    try {
        const {
            name,
            address,
            nic,
            email,
            contactNo,
            date: appointmentDate,
            reasonForVisit,
            availableTimeslots,
            doctorId,
            doctorName,
        } = req.body;

        const date = Date.parse(appointmentDate);

        const newAppointment = new Appointment({
            name,
            address,
            nic,
            email,
            contactNo,
            date,
            reasonForVisit,
            availableTimeslots,
            doctorId,
            doctorName,
        });

        const savedAppointment = await newAppointment.save();

        res.json(savedAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add appointment" });
    }
});

router.get("/view", (req, res) => {
    Appointment.find()
        .then((appointments) => {
            return res.status(200).json({
                success: true,
                existingAppointments: appointments,
            });
        })
        .catch((err) => {
            return res.status(400).json({
                error: err,
            });
        });
});

//get appointment by id
router.get("/get/:id", async(req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.findById(appointmentId).exec();

        if (!appointment) {
            return res
                .status(404)
                .json({ success: false, message: "Appointment not found" });
        }

        return res.status(200).json({
            success: true,
            appointment,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

//get appointment by date

router.get("/get/:date", (req, res) => {
    let appointmentDate = req.params.date;

    Appointment.find({ date: appointmentDate }, (err, appointments) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            appointments,
        });
    });
});

//update appointment
router.put("/update/:id", async(req, res) => {
    let appointmentId = req.params.id;
    const {
        name,
        address,
        nic,
        email,
        contactNo,
        date,
        reasonForVisit,
        availableTimeslots,
        doctorId,
        doctorName,
    } = req.body;

    const updateAppointment = {
        name,
        address,
        nic,
        email,
        contactNo,
        date,
        reasonForVisit,
        availableTimeslots,
        doctorId,
        doctorName,
    };

    const update = await Appointment.findByIdAndUpdate(
            appointmentId,
            updateAppointment
        )
        .then(() => {
            res.status(200).send({ status: "Appoointment updated" });
        })
        .catch((err) => {
            console.log(err);
            res
                .status(500)
                .send({ status: "error with updating data", error: err.message });
        });
});

//delete appointment
router.route("/delete/:id").delete(async(req, res) => {
    let appointmentId = req.params.id;

    await Appointment.findByIdAndDelete(appointmentId)
        .then(() => {
            res.status(200).send({ status: "Appointment deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                status: "error with deleting appointment",
                error: err.message,
            });
        });
});

module.exports = router;