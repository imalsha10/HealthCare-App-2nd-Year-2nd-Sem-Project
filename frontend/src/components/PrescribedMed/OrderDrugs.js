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
  
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  
  const navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Validate phone number format
    const numberRegex = /^\d+$/;
    if (!numberRegex.test(number)) {
      setNumberError("Please enter a valid phone number");
      return;
    }
    
    // If all fields are valid, proceed with form submission
    const newUser = {
      name,
      number,
      email,
      province,
      city,
      address,
  
    };

    axios.post("http://localhost:8080/user/add", newUser)
      .then((data) => {
        alert(data.data.user._id);
        navigate(`/order-details/${data.data.user._id}`, { state: newUser }); // Navigate to OrderDetails page with submitted data
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="background1">
      <h1 className="h1">Upload Your Prescription</h1>
      <img src="https://expertcourtreports.co.uk/wp-content/uploads/2022/05/Pharmacy.jpg" alt="Upload Prescription Illustration" className="prescription-image" style={{display:''}}/>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <form style={{ padding: 20, border: '1px solid #ccc', borderRadius: 5 }} onSubmit={sendData}>
          <h2>Prescribed Med</h2>
          <p>Send your certified prescription to us. and we will deliver your medicine to your home.</p>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputNumber" className="form-label">Number</label>
            <input type="text" className="form-control" id="number" onChange={(e) => setNumber(e.target.value)} required />
            {numberError && <p className="error-message">{numberError}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} required />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputProvince" className="form-label">Province</label>
            <input type="text" className="form-control" id="province" onChange={(e) => setProvince(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputCity" className="form-label">City</label>
            <input type="text" className="form-control" id="city" onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}
