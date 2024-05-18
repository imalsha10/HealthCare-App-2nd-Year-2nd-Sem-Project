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

     drug.find({}, { name: 1, quantity: 1, _id: 1})
     .sort({_id:-1})
     .limit(5)
     .then((drugs)=>{
           res.json(drugs)
     }).catch((err)=>{
        console.log(err)
     })

})


router.route("/get").get((req,res) =>{

     drug.find({}, {name:1, description : 1, price : 1, _id: 1})
     .sort({_id :-1})
     .limit(9)
     .then((drugs)=>{
         res.json(drugs)
     }).catch((err)=>{
         console.log(err)
     })

})

router.route("/getdrug/:id").get(async (req, res) => {
    try {
        const drugId = req.params.id;
        const drugs = await drug.findById(drugId);

        if (!drugs) {
            return res.status(404).send({ status: "Drug not found" });
        }

        res.status(200).send({ status: "Drug fetched", drugs });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error", error: err.message });
    }
});


router.route("/getone/:name").get((req,res) => {
    let drugName =  new RegExp(req.params.name, 'i') ;

    const Drug = drug.findOne({ name : drugName })
    .then((drug)=>{
        if(drug){
            const { name,  description , price} = drug
            res.status(200).send({status :"Drug Found",  name,  description , price})
        } else {
            console.log("Drug Not Found");
            res.status(404).send({status : "Drug Not Found"});
        }
       
    }).catch(()=>{
        console.log(err.message)
        res.status(500).send({status : "Error",  error : err.message})
    })

})

router.route("/update/:id").put( async (req,res) => {
    let drugName = req.params.id ;
    const {name,description,price,quantity} = req.body ;

    const updateDrug = {
       name,
       description,
       price,
       quantity
    }

     await drug.findByIdAndUpdate(drugName,updateDrug).then(() =>{
         res.json("Drug details Updated")
     }).catch((err)=>{
         console.log(err);
     })

})

router.put("/quantity/:productId", async (req, res) => {
    const productId = req.params.productId ;
    const { stockQuantity } = req.body;
  
    try {
     
      const product = await drug.findByIdAndUpdate(productId);
  
      
      product.stockQuantity = stockQuantity;
  
     
      await product.save();
  
      res.status(200).json({ message: 'Stock quantity updated successfully' });
    } catch (error) {
      console.error("Failed to update stock quantity:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



module.exports = router;