const router = require("express").Router();
let User = require("../Models/User");

router.route("/add").post((req,res)=>{

    const name=req.body.name;
    const number=req.body.number;
    const email=req.body.email;
    const province=req.body.province;
    const city=req.body.city;
    const address =req.body.address;
    
    

    const newUser = new User({

        name,
        number,
        email,
        province,
        city,
        address
    
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

    const{name,
        number,
        email,
        province,
        city,
        address
        
    }=req.body;

    const updateUser ={
        name,
        number,
        email,
        province,
        city,
        address
        
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