const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070 ;

// Routes
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const labServiceRoutes = require("./Routes/labServiceRoutes");
const appointmentRoutes = require("./Routes/appointmentRoutes");



// middleware
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });


const drugsRouter = require("./Routes/drugs");
app.use("/newdrugs",drugsRouter);

const ordersRouter = require("./Routes/orders");
app.use("/neworders",ordersRouter);

// Routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/labServices", labServiceRoutes);
app.use("/api/appointments", appointmentRoutes);

