const router = require("express").Router();

let Eventform = require("../Models/Eventform");

router.route("/addcus").post((req, res) => {
  const fullname = req.body.fullname;
  const age = req.body.age;
  const phonenumber = req.body.phonenumber;
  const email = req.body.email;
  const eventid = req.body.eventid;

  const newEventform = new Eventform({
    fullname,
    age,
    phonenumber,
    email,
    eventid,
  });

  newEventform
    .save()
    .then(() => {
      res.json({
        message: "Eventform Added",
        data: newEventform,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/cus").get((req, res) => {
  Eventform.find()
    .then((eventforms) => {
      res.json(eventforms);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/updatecus/:id").put(async (req, res) => {
  let eventformId = req.params.id;
  const { fullname, age, phonenumber, email, eventid } = req.body;

  const updateEventform = {
    fullname,
    age,
    phonenumber,
    email,
    eventid,
  };

  const update = await Eventform.findByIdAndUpdate(eventformId, updateEventform)
    .then(() => {
      res.status(200).send({ status: "Successfully Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

router.route("/deletecus/:id").delete(async (req, res) => {
  let eventformId = req.params.id;
  await Eventform.findByIdAndDelete(eventformId)
    .then(() => {
      res.status(200).send({ status: " Successfully Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Errot with delete data", error: err.message });
    });
});

router.route("/getcus/:id").get(async (req, res) => {
  let eventformId = req.params.id;
  const eventform = await Eventform.findById(eventformId)
    .then((eventform) => {
      res.status(200).send({ status: "Successfully Fetched", eventform });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with get  Event", error: err.message });
    });
});

module.exports = router;
