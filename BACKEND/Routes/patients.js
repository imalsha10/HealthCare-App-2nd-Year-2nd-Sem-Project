const router = require("express").Router();
const { Router } = require("express");
let Patient = require("../Models/patient");
const mongoose = require('mongoose');

router.route("/add").post((req, res) => {

    const date = req.body.date;
    const name = req.body.name;
    const email = req.body.email;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const address = req.body.address;
    const tpNumber = req.body.tpNumber;
    const service = req.body.service;
    const time = req.body.time;
    const price = req.body.price;

    const newPatient = new Patient({
        date,
        name,
        email,
        age,
        gender,
        address,
        tpNumber,
        service,
        time,price
    });

    newPatient.save().then((patient) => { 
        res.status(201).json({ message: "Patient added successfully.", patientId: patient._id });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Failed to add patient" });
    });

});


router.route("/").get((req,res) => {
    Patient.find().then((patients) => {
        res.json(patients);
    }).catch((err) => {
        console.log(err);
    });
})

router.route("/update/:patientId").put(async (req, res) => {
  const patientId = req.params.patientId;
  const { name, email, age, gender, address, tpNumber, service, time, price } = req.body;

  if (!mongoose.isValidObjectId(patientId)) {
    return res.status(400).json({ error: "Invalid Patient ID" });
  }

  const updatePatient = {
    name,
    email,
    age,
    gender,
    address,
    tpNumber,
    service,
    time,
    price
  };

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, updatePatient, { new: true });
    if (updatedPatient) {
      res.status(200).send({ status: "User Updated" });
    } else {
      res.status(404).send({ status: "Patient not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error with updating data.", error: err.message });
  }
});


router.route("/delete/:id").delete(async(req,res) => {
    let userId = req.params.id;

    await Patient.findByIdAndDelete(userId).then(() =>{
        res.status(200).send({status: "User Deleted"});
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with deleting data.", error: err.message});
    });
})

router.route("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    const user = await Patient.findById(userId).then((patient) =>{
        res.status(200).send({status: "User fetched", patient});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router;