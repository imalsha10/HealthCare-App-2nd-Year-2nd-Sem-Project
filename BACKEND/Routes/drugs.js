const router = require("express").Router();
const { json } = require("express");
let drug = require("../Models/drug");

router.route("/add").post((req,res)=>{
    
    const name = req.body.name ;
    const description = req.body.description ;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);

    const newDrug = new drug({
        name,
        description,
        price,
        quantity
    })

    newDrug.save().then(()=>{
        res.json("Drug Added to System")
    }).catch((err)=>{
        console.log(err)
    })


})


router.route("/").get((req,res)=>{

     drug.find({}, { name: 1, quantity: 1, _id: 0})
     .sort({_id:-1})
     .limit(5)
     .then((drugs)=>{
           res.json(drugs)
     }).catch((err)=>{
        console.log(err)
     })

})




module.exports = router;