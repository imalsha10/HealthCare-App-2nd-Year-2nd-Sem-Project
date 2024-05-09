const router = require("express").Router();
let doctor = require("../Models/doctor");

router.route("/add").post((req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const specialty = req.body.specialty;
    const img = req.body.img;
    const description=req.body.description;

    const newdoctor = new doctor({
        id,
        name,
        specialty,
        img,
        description,

    });

    newdoctor
        .save()
        .then(() => {
            res.json("Doctor Added");
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/").get((req, res) => {
    doctor
        .find()
        .then((doctor) => {
            res.json(doctor);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/update/:id").put(async(req, res) => {
    let doctorid = req.params.id;
    const { id, name, specialty } = req.body;

    const updatedoctor = {
        id,
        name,
        specialty,
    };
    const update = await doctor
        .findByIdAndUpdate(doctorid, updatedoctor)
        .then(() => {
            res.status(200).send({ status: " Doctor Updated" });
        })
        .catch((err) => {
            console.log(err);
            res
                .status(500)
                .send({ status: "Error with updating data", error: err.message });
        });
});

router.route("/delete/:id").delete(async(req, res) => {
    let doctorid = req.params.id;

    await doctor
        .findByIdAndDelete(doctorid)
        .then(() => {
            res.status(200).send({ status: " Doctor deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                status: "error with deleting doctor",
                error: err.message,
            });
        });
});

router.route("/get/:id").get(async(req, res) => {
    let doctor = req.params.id;

    const doctorid = await doctor
        .findById(doctorid)
        .then((doctor) => {
            res.status(200).send({ status: "User fetched", doctor });
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: "Error with get user", error: err.message });
        });
});

module.exports = router;