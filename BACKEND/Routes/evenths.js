const router = require("express").Router();
let Eventh = require("../Models/Eventh");

router.route("/addevent").post((req, res) => {
  const eventcode = req.body.eventcode;
  const eventtitle = req.body.eventtitle;
  const eventauthorname = req.body.eventauthorname;
  const eventdate = req.body.eventdate;
  const eventsummary = req.body.eventsummary;
  const eventbody = req.body.eventbody;
  const image = req.body.image;

  const newEventh = new Eventh({
    eventcode,
    eventtitle,
    eventauthorname,
    eventdate,
    eventsummary,
    eventbody,
    image,
  });

  newEventh
    .save()
    .then(() => {
      res.json("Event Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Eventh.find()
    .then((evenths) => {
      res.json(evenths);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/updateevent/:id").put(async (req, res) => {
  let eventId = req.params.id;
  const {
    eventcode,
    eventtitle,
    eventauthorname,
    eventdate,
    eventsummary,
    eventbody,
  } = req.body;

  const updateEventh = {
    eventcode,
    eventtitle,
    eventauthorname,
    eventdate,
    eventsummary,
    eventbody,
  };

  const update = await Eventh.findByIdAndUpdate(eventId, updateEventh)
    .then(() => {
      res.status(200).send({ status: "Event Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

router.route("/deleteevent/:id").delete(async (req, res) => {
  let eventId = req.params.id;
  await Eventh.findByIdAndDelete(eventId)
    .then(() => {
      res.status(200).send({ status: " Event Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Errot with delete data", error: err.message });
    });
});

router.route("/getevent/:id").get(async (req, res) => {
  let eventId = req.params.id;
  const event = await Eventh.findById(eventId)
    .then((event) => {
      res.status(200).send({ status: "Event Fetched", event });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with get  Event", error: err.message });
    });
});

module.exports = router;
