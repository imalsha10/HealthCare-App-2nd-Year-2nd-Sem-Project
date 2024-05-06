const router = require("express").Router();
let User = require("../Models/User");
const nodemailer = require('nodemailer');


router.route("/add").post( async (req,res)=>{

    const name=req.body.name;
    const number=req.body.number;
    const email=req.body.email;
    const province=req.body.province;
    const city=req.body.city;
    const address =req.body.address;
    const description =req.body.description;
    
    const image =req.body.image;
    
    
    

    const newUser = new User({

        name,
        number,
        email,
        province,
        city,
        address,
        description,
        image,
        
        
    
    })
    try {
        const savedUser = await newUser.save();
        res.json({ message: "User added successfully", user: savedUser });
    } catch (err) {
        console.log(err);
    }
    
    

})


router.route("/").get((req,res)=>{
    User.find().then((users)=>{
        res.json(users)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    const userId = req.params.id;

    const{name,
        number,
        email,
        province,
        city,
        address,
        description,
        
        
        
    }=req.body;

    const updateUser ={
        name,
        number,
        email,
        province,
        city,
        address,
        description,
        
    
        
        
    };
    const update = await User.findByIdAndUpdate(userId,updateUser).then(()=>{
        res.status(200).send({status:"user updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with upating date",error:err.message});
    })

})
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await User.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user",error:err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let userId =req.params.id;
    const user = await User.findById(userId)
    .then((user)=>{
        res.status(200).send({status:"User fetched",user})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message})
    })
})
const sendEmail = async (to, subject, text) => {
    try {
      // Create a transporter object using SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'windypereira39@gmail.com', // Your email
          pass: '200153500771V' // Your password
        }
      });
  
      // Send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'vindiovinya2@gmail.com', // Your email
        to: to,
        subject: subject,
        text: text
      });
  
      console.log('Email sent: ' + info.response);
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  };
  
module.exports = router;
