
const router = require("express").Router();
let User = require("../models/User");

router.route("/add").post((req,res)=>{

    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const province=req.body.province;
    const city=req.body.city;
    
    

    const newUser = new User({

        fname,
        lname,
        email,
        province,
        city,
    
    })

    newUser.save().then(()=>{
        res.json("user added")
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/").get((req,res)=>{
    User.find().then((users)=>{
        res.json(users)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;

    const{fname,
        lname,
        email,
        province,
        city,
        
    }=req.body;

    const updateUser ={
        fname,
        lname,
        email,
        province,
        city,
        
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
module.exports = router;