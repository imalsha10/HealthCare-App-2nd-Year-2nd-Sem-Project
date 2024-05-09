import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { handleUpload } from "./handleUpload";
import { successMessage } from "./Alert";
import './OrderDrugs.css';


export default function OrderDrugs() {

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0); // Initialize progress to 0%
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
      image,
      name,
      number,
      email,
      province,
      city,
      address,
      description
    };

    axios.post(`http://localhost:8070/user/add`, newUser)
      .then((data) => {
        const userId = data.data.user._id;
        successMessage("success","drug added");
        setImage("");
        setFile("");
        setPercent(0);
        // Simulating image upload progress
        setUploadProgress(50); // Set progress to 50%
        // Simulate image upload completion after 2 seconds
        setTimeout(() => {
          setUploadProgress(100); // Set progress to 100%
          alert("Image uploaded successfully!");
          navigate(`/order-details/${userId}`, { state: newUser }); // Navigate to OrderDetails page with submitted data
        }, 2000);
      })
      .catch((err) => {
        alert(err);
      });
  }

  const handleImageUpload = (e) => {
    handleUpload({ file, setPercent, setFunc: setImage });
  };

  // Handle blog image change
  function handleImageChange(event) {
    setFile(event.target.files[0]);
  }

  return (
    <div className="background1">
     
      
      <div style={{ width: "100%", backgroundColor: "#00CED1", height: "175px",marginTop:"0px",marginBottom:"70px" }}>
        <h2 style={{ textAlign: "center", padding: "1px 0", color: "black",marginTop:"50px"}}>Upload Prescription</h2>
      
        <div className="container text-center" style={{marginTop:"60px",marginBottom:"0px"}}>
       
        <div className="row">
          <div className="col" style={{ backgroundColor: "#008080" ,color:"white",borderRadius:"50px"}}>
            <img src="https://cdn.icon-icons.com/icons2/1122/PNG/512/rectangleinsquare_79513.png" style={{ width: "20px" }} />
            Low prices, with or without insurance
          </div>
          <div className="col" style={{ backgroundColor: "#008080" ,color:"white",borderRadius:"50px",marginLeft:"50px",marginRight:"50px"}} >
            <img src="https://cdn.icon-icons.com/icons2/1122/PNG/512/rectangleinsquare_79513.png" style={{ width: "20px" }} />
            Automatic refills, delivered to your door
          </div>
          <div className="col" style={{ backgroundColor: "#008080" ,color:"white",borderRadius:"50px"}}>
            <img src="https://cdn.icon-icons.com/icons2/1122/PNG/512/rectangleinsquare_79513.png" style={{ width: "20px" }} />
            Pharmacists on call 24/7
          </div>
        </div>
       
      </div>

      </div>
      <div class="container text-center" style={{ marginBottom:"20px"}} >
      <div class="row">
    <div class="col">
      <img style={{width:"50%"}} src="https://st2.depositphotos.com/20995018/47212/v/450/depositphotos_472123570-stock-illustration-rx-form-form-for-medicines.jpg"/>
    </div>
    <div class="col">
    <img style={{width:"50%"}} src="https://static.vecteezy.com/system/resources/previews/020/862/901/original/doctor-writing-prescription-illustration-concept-on-white-background-vector.jpg"/>
   
    </div>
    <div class="col">
    <img style={{width:"50%"}} src="https://img.freepik.com/premium-vector/medicine-prescription-formular-rx-drugs-pills-medicines-medical-list-treatment-healthcare-diagnoses-proper-dosing-list-vector-illustration_229548-2889.jpg"/>
   
    </div>
  </div>
        </div>


      
      <div className="container">
        <form className="shadow p-4 rounded" style={{width:'800px'}} onSubmit={sendData}>
          <p>Please fill the following details & upload the prescription.</p>
          <div className="row" >
            <div className="col-md-6">
              <h2  class="fst-italic">Personal Details</h2>
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputNumber" className="form-label">Phone Number</label>
                <input type="text" className="form-control" id="number" onChange={(e) => setNumber(e.target.value)} required />
                {numberError && <p className="error-message">{numberError}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} required />
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <h2  class="fst-italic">Delivery Details</h2>
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
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h2  class="fst-italic">Prescription</h2>
              
            <label htmlFor="imageDescription" className="form-label" style={{marginTop:'18px'}}>Prescription Description</label>
                <textarea className="form-control" id="imageDescription" rows="3" onChange={(e) => setDescription(e.target.value)} required ></textarea>
          </div>
          <div className="row mt-3">
            <div className="col">
              <div className="mb-3">



              
              <label htmlFor="image"  className="form-label" style={{ fontWeight: '500' }}>Photo</label>
              <input
                type="file"
                className="form-control"
                id="image"
                placeholder="Upload image"
                onChange={handleImageChange}
                required
              />
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={!file || percent === 100}
                className="btn btn-outline-dark mt-2 btn-sm"
              >
                Upload
              </button>
              <div className="progress mt-2">
                <div
                  className={`progress-bar ${
                    percent < 100
                      ? "bg-success progress-bar-striped progress-bar-animated"
                      : "bg-success"
                  }`}
                  role="progressbar"
                  style={{ width: `${percent}%` }}
                  aria-valuenow={percent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {percent < 100
                    ? `Uploading ${percent}%`
                    : `Uploaded ${percent}% `}
                </div>
                </div>
              
            </div>
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>

      </div>

      <p class="fw-bold"  style={{ textAlign: "center", padding: "10px 0", color: "black", fontSize: "20px",marginTop:"50px",marginBottom:"40px"}}>e-Channeling is the most trustworthy & reliable online pharmacy in Sri Lanka. Simply upload your prescription to get your medication.</p>
     
      <div class="grid-container" style={{display: 'grid',backgroundColor:"#ccffe6",BsColumnsGap:'50px',gridTemplateColumns: 'auto auto auto',padding: '10px'}}>
  <div class="grid-item" style={{backgroundcolor: 'rgba(255, 255, 255, 0.8)',border: '1px solid rgba(0, 0, 0, 0.8)',borderBlockColor:"white",padding: '20px',fontsize: '30px',textalign: 'center'}}>1 Lakh+ Products
We maintain strict quality controls on all our partner retailers, so that you always get standard quality products</div>
  <div class="grid-item" style={{backgroundcolor: 'rgba(255, 255, 255, 0.8)',border: '1px solid rgba(0, 0, 0, 0.8)',borderBlockColor:"white",padding: '20px',fontsize: '30px',textalign: 'center'}}>Secure Payment
100% secure and trusted payment protection
</div>
  <div class="grid-item" style={{backgroundcolor: 'rgba(255, 255, 255, 0.8)',border: '1px solid rgba(0, 0, 0, 0.8)',borderBlockColor:"white",padding: '20px',fontsize: '30px',textalign: 'center'}}>Easy Return
We have a new and dynamic return window policy for medicines and healthcare items. Refer FAQs section for more details</div>  </div>

    </div>
  );
}
