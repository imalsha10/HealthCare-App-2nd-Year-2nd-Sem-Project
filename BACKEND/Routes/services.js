const router = require("express").Router();
let Service = require("../Models/service");

router.route("/add").post((req, res) => {
    const { name, description } = req.body;

    const newService = new Service({
        name,
        description
    });

    newService.save()
        .then(() => {
            res.json("Service Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error", error: err.message });
        });
});

router.route("/").get((req, res) => {
    Service.find()
        .then((services) => {
            res.json(services);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error", error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    try {
        const serviceId = req.params.id;
        const { name, description } = req.body;

        const updateService = {
            name,
            description
        };

        const updatedService = await Service.findByIdAndUpdate(serviceId, updateService, { new: true });

        res.status(200).send({ status: "Service Updated", service: updatedService });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error", error: err.message });
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    try {
        const serviceId = req.params.id;

        await Service.findByIdAndDelete(serviceId);
        res.status(200).send({ status: "Service Deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error", error: err.message });
    }
});

router.route("/get/:id").get(async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).send({ status: "Service not found" });
        }

        res.status(200).send({ status: "Service fetched", service });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error", error: err.message });
    }
});

module.exports = router;