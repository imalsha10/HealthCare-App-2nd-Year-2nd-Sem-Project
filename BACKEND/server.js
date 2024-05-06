const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070 ;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL ;

mongoose.connect(URL, {
 useCreateIndex: true,
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
 console.log("MongoDB Connection successfull!");
});

const drugsRouter = require("./Routes/drugs");
app.use("/newdrugs",drugsRouter);

const ordersRouter = require("./Routes/orders");
app.use("/neworders",ordersRouter);



//PrescribedMed
const userRouter = require("./Routes/users");
app.use("/user",userRouter);



app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}!`);
});