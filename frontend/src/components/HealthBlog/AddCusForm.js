import React, { useState} from "react";
import axios from "axios";
import { useNavigate,Link ,useParams} from "react-router-dom";
import { successMessage } from "../HealthBlog/utils/Alert";


export default function AddCusForm() {
  const [focused, setFocused] = useState(false);
  const { eventId } = useParams();
 const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  

  const handleFocus = () => {
    setFocused(true);
  };


  function sendDataform(e) {
    e.preventDefault();

    const newEventForm = {
      fullname,
      age,
      phonenumber,
      email,
      eventId,
    };

    axios
      .post(`http://localhost:8070/eventform/addcus/${eventId}`, newEventForm)
      .then((response) => {
        successMessage("Success", "Participation Added");
        const participationId = response.data.data._id;
        navigate(`/blog/getcus/${participationId}`);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <div className="main-container " style={{ 
      backgroundImage: 'url("https://img.freepik.com/free-photo/elegant-white-background-with-blue-wave-lines_1017-32741.jpg?t=st=1714910283~exp=1714913883~hmac=c681016ba767c121f58becf9b05631f85caeebe658e8ba63a62ac9a3fb6c566d&w=1380")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px', 
      
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    }}>

    <div className="container">
    <header>
      <div className="topic" style={{color:'black'}}>Health Blog</div>
    </header>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', width: '50%' }}>
  <h1 style={{ color: 'darkblue',margin: '0', marginBottom: '10px' ,fontFamily:"serif"}}>Come Let's Join..</h1>
  <h3 style={{color:'#005fbb',fontFamily:"serif",textAlign:"justify"}}>If you would like to take part of in Our Event,</h3>
  <h5 style={{ color: 'black',fontFamily:"serif",textAlign:"justify"}}> Please fill in your details in the Event Registration Form below and you will be automatically registered.</h5>
</div>
<br/>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Form on the left side */}
      <form
        style={{
          width: "40%",
          padding: "30px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white"
        }}
        onSubmit={sendDataform}
      >
        <div style={{ backgroundColor: "#000042", height: "10vh" }}>
          <br/>
          <h3 style={{ textAlign: 'center', color: 'white' }}>Event Registration</h3>
        </div><br/>
  
        {/* Form fields */}
        <div className="form-group">
          <label htmlFor="fullname" className="form-label" style={{ fontWeight: '500' }}>Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            placeholder="Enter Your Full Name"
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            pattern="[A-Za-z\s]{3,30}"
            required
            onBlur={handleFocus}
            focused={focused.toString()}
          />
        </div>
        <div className="form-group">
      <label htmlFor="age" className="form-label" style={{ fontWeight: '500' }}>
        Enter Age
      </label>
      <input
        type="number"
        className="form-control"
        id="age"
        placeholder="Enter Your Age"
        onChange={(e) => {
          setAge(e.target.value);
        }}
        min="1"
        max="150"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="phonenumber" className="form-label" style={{ fontWeight: '500' }}>
        Phone Number
      </label>
      <input
        type="tel"
        className="form-control"
        id="phonenumber"
        placeholder="Enter Your Phone Number"
        onChange={(e) => {
          setPhonenumber(e.target.value);
        }}
        pattern="[0-9]{10}"
        required
        onBlur={handleFocus}
        focused={focused.toString()}
      />
    </div>

    <div className="form-group">
      <label htmlFor="email" className="form-label" style={{ fontWeight: '500' }}>
        Email Address
      </label>
      <input
        type="email"
        className="form-control"
        id="email"
        placeholder="Enter Your Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="eventid" className="form-label" style={{ fontWeight: '500' }}>
        Event ID
      </label>
      <input
        type="text"
        className="form-control"
        id="eventid"
        value={eventId}
        readOnly
        
        required
      />
    </div>
    <br />

  
        {/* Submit button */}
        <div className="col-md-12" style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="submit"
            id="submit-btn"
            className="btn btn-success btn-send pt-2 btn-block"
            value="Submit"
            style={{ backgroundColor: 'blue', color: 'white' }}
          />
        </div>
      </form>
  
      {/* Image on the right side */}
      <img src="https://img.freepik.com/free-vector/flat-medical-conference-illustration_23-2148887153.jpg?t=st=1714882926~exp=1714886526~hmac=26f5fd1899cd39d997da012ea46a997c19a28960d8481dba9e4bb5bbab320bbb&w=996" alt="Right Side " style={{ maxWidth: '50%', marginLeft: '20px' }} />
    </div>
  
    <br/>
    <div style={{ marginBottom: '20px' }}>
      <Link to="/blog/allblogs" className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: "#1434A4" }}>Go to Health Blog</Link>
    </div>
  </div>
  
</div>

  );
}