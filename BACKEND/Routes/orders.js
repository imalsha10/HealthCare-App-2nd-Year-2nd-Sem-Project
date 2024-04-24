const router = require("express").Router();
const { json } = require("express");
let order = require("../Models/order");

router.route("/place").post((req,res)=>{
    
    const  firstname = req.body.firstname ;
    const  lastname = req.body.lastname ;
    const  address = req.body.address ;
    const phoNumber = Number(req.body.phoNumber);
    const healthCode = req.body.healthCode ;
    const noItems = Number(req.body.noItems);

    const newOrder = new order({
       firstname,
       lastname,
       address,
       phoNumber,
       healthCode,
       noItems
    })

    newOrder.save().then(()=>{
        res.json("Order Placed!")
    }).catch((err)=>{
        console.log(err)
    })


})


router.route("/vieworders").get((req,res)=>{

    order.find({},{_id:0})
    .then((drugs)=>{
          res.json(drugs)
    }).catch((err)=>{
       console.log(err)
    })

})

router.route("/update/:id").put( async (req,res) => {
    let orderId = req.params.id ;
    const {firstname,lastname,address,phoNumber,healthCode,noItems} = req.body ;

    const updateOrder = {
        firstname,
        lastname,
        address,
        phoNumber,
        healthCode,
        noItems
    }

     await order.findByIdAndUpdate(orderId,updateOrder).then(() =>{
         res.json("Order details Updated")
     }).catch((err)=>{
         console.log(err);
     })

})


router.route("/deleteorder/:id").delete( async (req,res) => {
    let orderId = req.params.id ;

    await order.findByIdAndDelete(orderId).then(() => {
         res.json("Order Deleted!")
    }).catch((err) => {
         console.log(err)
    })
    
})


module.exports = router ;