require('dotenv').config();
const nodemailer = require('nodemailer');
const router = require("express").Router();
const Inquiry = require("../Models/Inquiry.js");

router.route("/add").post((req, res) => {
    const { name, email, phone, type, message } = req.body;

    const newInquiry = new Inquiry({
        name,
        email,
        phone,
        type,
        message
    });

    newInquiry.save()
        .then(() => {
            res.json("Successfully Created");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Failed to create inquiry");
        });
});

router.route("/").get((req, res) => {
    Inquiry.find()
        .then((inquiries) => {
            res.json(inquiries);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Failed to retrieve inquiries");
        });
});

router.route("/update/:inquiryId").put((req, res) => {
    const inquiryId = req.params.inquiryId;
    const { replyMessage } = req.body;

    Inquiry.findByIdAndUpdate(inquiryId, { replyMessage })
        .then(() => {
            res.json("Update Success");
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json("Failed to update inquiry");
        });
});

router.route("/delete/:inquiryId").delete(async (req, res) => {
    const inquiryId = req.params.inquiryId;
    try {
        await Inquiry.findByIdAndDelete(inquiryId);
        res.status(200).send({ status: "Inquiry deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error with delete inquiry", error: err.message });
    }
});

router.route("/view/:inquiryId").get((req, res) => {
    const inquiryId = req.params.inquiryId;
    Inquiry.findById(inquiryId)
        .then((inquiry) => {
            res.json(inquiry);
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json("Failed to view inquiry");
        });
});

// send email
router.post('/send-email', async (req, res) => {
    const { id, msg } = req.body;

    if (!msg) {
        return res.status(400).json({ error: 'Please provide email content' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, 
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: id.email,
            // to: 'sandalidahanayake@gmail.com',
            // to: 'codelink.07157@gmail.com', 
            subject: 'Test Email',
            text: msg, 
        };

        await transporter.sendMail(mailOptions);
        
        // Respond with success message
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error.stack);
        res.status(500).json({ error: 'An error occurred while sending the email' });
    }
});


module.exports = router;
