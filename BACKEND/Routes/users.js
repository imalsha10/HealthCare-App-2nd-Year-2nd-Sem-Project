const router = require("express").Router();
let User = require("../Models/User");
const sendEmail = require("../util/sendEmail");
const prescriptionEmailTemplate = require("../util/email_templates/prescriptionEmailTemplate");

router.route("/add").post(async (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const email = req.body.email;
  const province = req.body.province;
  const city = req.body.city;
  const address = req.body.address;
  const description = req.body.description;
  const image = req.body.image;

  const newUser = new User({
    name,
    number,
    email,
    province,
    city,
    address,
    description,
    image
  });
  try {
    const savedUser = await newUser.save();
    res.json({ message: "User added successfully", user: savedUser });
  } catch (err) {
    console.log(err);
  }
});

router.route("/").get((req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  const userId = req.params.id;

  const { name, number, email, province, city, address, description } =
    req.body;

  const updateUser = {
    name,
    number,
    email,
    province,
    city,
    address,
    description,
  };
  const update = await User.findByIdAndUpdate(userId, updateUser)
    .then(() => {
      res.status(200).send({ status: "user updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "error with upating date", error: err.message });
    });
});
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;
  await User.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "User deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete user", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  const user = await User.findById(userId)
    .then((user) => {
      res.status(200).send({ status: "User fetched", user });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

// send email
router.route("/send-email").post((req, res) => {
  const { fullName, totalAmount, date, email } = req.body;

  try {
    const emailTemplate = prescriptionEmailTemplate(
      fullName,
      totalAmount,
      date
    );
    //
    sendEmail(email, "Prescription Details", emailTemplate);
    //
    res.status(200).json({
      success: true,
      message: `Email sent successfully to ${email}`,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).json({
      success: false,
      error,
      message:
        "An error occurred while sending the email. Please try again later.",
    });
  }
});

module.exports = router;
