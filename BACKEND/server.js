const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070 ;

const stripe = require("stripe")(process.env.STRIPE_SECRET)

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

//Online Pharmacy
const drugsRouter = require("./Routes/drugs");
app.use("/newdrugs",drugsRouter);

const ordersRouter = require("./Routes/orders");
app.use("/neworders",ordersRouter);

app.post("/create-checkout-session", async (req,res) => {
    const {products} = req.body ;

    const lineItems = products.map((product) => ({
        price_data:{
            currency:'usd',
            product_data:{
                name:product.name,
            },
            unit_amount: Math.round(product.price),
        },
        quantity:product.qty
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/online-p/paysuccess",
        cancel_url:"http://localhost:3000/onlinepharmacyP"
    })

    res.json({id:session.id})
})

//Health Blog
const bloghRouter = require("./Routes/bloghs.js");
app.use("/blogh", bloghRouter);

const eventRouter = require("./Routes/evenths.js");
app.use("/eventh", eventRouter);

const eventformRouter = require("./Routes/eventforms.js");
app.use("/eventform", eventformRouter);



//PrescribedMed
const userRouter = require("./Routes/users");
app.use("/user",userRouter);


//consultantcare
const doctorRouter = require("./Routes/doctors.js");
app.use("/doctor", doctorRouter);

const appointmentRouter = require("./Routes/appointments.js");
app.use("/appointment", appointmentRouter);


app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}!`);
});


