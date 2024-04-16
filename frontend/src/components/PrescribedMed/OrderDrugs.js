import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './OrderDrugs.css';



export default function OrderDrugs() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  
  const navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();
    const newUser = {
      name,
      number,
      email,
      province,
      city,
      address
    };

    axios.post("http://localhost:8080/user/add", newUser)
      .then(() => {
        alert("User added");
        navigate('/order-details', { state: newUser }); // Navigate to OrderDetails page with submitted data
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="background">
      <h1 className="h1">Upload Your Prescription</h1>
      <img src="https://expertcourtreports.co.uk/wp-content/uploads/2022/05/Pharmacy.jpg" alt="Upload Prescription Illustration" className="prescription-image" style={{display:''}}/>
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form style={{ padding: 20, border: '1px solid #ccc', borderRadius: 5 }} onSubmit={sendData}>
        <h2>Prescribed Med</h2>
        <p>Send your certified prescription to us. and we will deliver your medicine to your home.</p>
        <div class="mb-3">
    <label for="exampleInputName" class="form-label">Full Name</label>
    <input type="text" class="form-control" id="name" onChange={(e)=>{

      setName(e.target.value);
    }}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputNumber" class="form-label">Number</label>
    <input type="text" class="form-control" id="number" onChange={(e)=>{

setNumber(e.target.value);
}}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" onChange={(e)=>{

setEmail(e.target.value);
}}/>

  </div>
  <div class="mb-3">
    <label for="exampleInputProvince" class="form-label">Province</label>
    <input type="text" class="form-control" id="province" onChange={(e)=>{

setProvince(e.target.value);
}}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputCity" class="form-label">City</label>
    <input type="text" class="form-control" id="city" onChange={(e)=>{

setCity(e.target.value);
}}/>
  </div>

  <div class="mb-3">
    <label for="exampleInputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="address" onChange={(e)=>{

setAddress(e.target.value);
}}/>
  </div>
   
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
  );
}
