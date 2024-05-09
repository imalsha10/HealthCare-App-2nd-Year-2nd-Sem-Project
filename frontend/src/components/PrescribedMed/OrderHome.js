import React from "react";
import { Link } from "react-router-dom";


function OrderHome(){
    return(

        <div>
       <div style={{width:'100%',backgroundColor:"#AFEEEE",height:'175px',marginTop:"20px"}}>
        <p style={{textAlign:'center', padding:' 30px 0',color:'white', fontSize:'50px'}}>Save time, save money, stay healthy.</p>
        
       </div>
     
       <div style={{textAlign:"center",alignItems:"center"}}>
       
        
         <h3 style={{marginTop:"30px"}}>Prescribed Med</h3>
         <Link to="/prescribed-m/add">
         <button style={{backgroundColor:'#4B0082',textAlign:"center",marginTop:"10px",color:"white",width:"350px",borderRadius:"50px",marginBottom:"50px"}}  >Upload Prescription</button>
         </Link>
        </div>
       
       <div class="container text-center">
  <div class="row">
    <div class="col">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHJuDfhbtTlRcJTUvrCqbxtOfj3mtvzX06bSkC5xylHMEHdDa2AGNslC0iHjeGMC19ynk&usqp=CAU" style={{width:'50%'}}/>
      <p class="fw-bold" >1. Sign up for Rathnam hospital</p>
      <p>It’s simple. And free, always.Sign in or sign up to get started</p>
    </div>
    <div class="col">
    <img src="https://cdn-icons-png.flaticon.com/256/12340/12340236.png" style={{width:'50%'}}/>
      <p class="fw-bold">2. We’ll get your prescription</p>
      <p>We can work with your insurance and current pharmacy to get your prescription.</p>
    </div>
    <div class="col">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx4EqltCQQfKh2L8ng6KVLcUlG1W55fGjfdDFX5lFIFCRTYOFqZvcZiOG5bzZDp3DGrs4&usqp=CAU" style={{width:'50%'}}/>
      <p class="fw-bold">3.Pick up meds</p>
      <p>Pick up your drugs from the pharmacy</p>
    </div>
   </div>
   </div>

   <div style={{width:'100%',backgroundColor:"#8FBC8F",height:'175px'}}>
        <p style={{textAlign:'center', padding:' 30px 0',color:'white', fontSize:'50px'}}>Finally, a pharmacy that really delivers.</p>
        
       </div>
      
   <div class="container text-center" style={{marginBottom:"80px"}}>
    <h3 style={{marginTop:"60px",marginBottom:"50px"}}>Sri Lanka's Leading Online Pharmacy & Healthcare Platforms</h3>
  <div class="row">
    <div class="col" style={{backgroundColor:""}}>
    <img src="https://banner2.cleanpng.com/20180704/vvl/kisspng-computer-icons-check-mark-symbol-clip-art-5b3c8d175fc2b0.8298630415306949353922.jpg" style={{width:"20px"}}/>
      Low prices, with or without insurance
    </div>
    <div class="col">
    <img src="https://banner2.cleanpng.com/20180704/vvl/kisspng-computer-icons-check-mark-symbol-clip-art-5b3c8d175fc2b0.8298630415306949353922.jpg" style={{width:"20px"}}/>
    Automatic refills, delivered to your door
    </div>
    <div class="col">
    <img src="https://banner2.cleanpng.com/20180704/vvl/kisspng-computer-icons-check-mark-symbol-clip-art-5b3c8d175fc2b0.8298630415306949353922.jpg" style={{width:"20px"}}/>
    Pharmacists on call 24/7
    </div>
    
  </div>
  <a href="./prescribed-m/Pharmacydetails" style={{marginTop:"100px"}}>click hear to read more</a>
</div>


    
      </div>
    )
}
export default OrderHome;