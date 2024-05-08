import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/AddBlogs.css";


export default function UpdateCus() {
  const [focused, setFocused] = useState(false);

  const [fullname, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [eventid, setEventid] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8070/eventform/getcus/${id}`)
      .then((response) => {
        console.log(response);
        setFullName(response.data.eventform.fullname);
        setAge(response.data.eventform.age);
        setPhonenumber(response.data.eventform.phonenumber);
        setEmail(response.data.eventform.email);
        setEventid(response.data.eventform.eventid);
      })
      .catch((err) => {
        console.error("Error fetching appointment:", err);
      });
  }, [id]);

  const handleFocus = () => {
    setFocused(true);
  };

  const sendData = (e) => {
    e.preventDefault();

    const updatedParticipation = {
      fullname,
      age,
      phonenumber,
      email,
      eventid,
    };

    axios
      .put(
        `http://localhost:8070/eventform/updatecus/${id}`,
        updatedParticipation
      )
      .then((response) => {
        console.log("Participation updated:", response.data);
        alert("Confirm Participation");
        navigate("/blog/allblogs");
      })
      .catch((err) => {
        alert("Error updating appointment: " + err);
      });
  };

  return (
    <div className="main-container" style={{ 
      backgroundImage: 'url("https://img.freepik.com/free-photo/elegant-white-background-with-blue-wave-lines_1017-32741.jpg?t=st=1714910283~exp=1714913883~hmac=c681016ba767c121f58becf9b05631f85caeebe658e8ba63a62ac9a3fb6c566d&w=1380")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px', 
      
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    }} >
     
       
      <div className="container">
        

      <header>
      <div className="topic" style={{color:'black'}}>Health Blog</div>
    </header>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', width: '50%' }}>
  <h1 style={{ color: 'darkblue',margin: '0', marginBottom: '10px' ,fontFamily:"serif"}}>Update Registration</h1>
  
  <h5 style={{ color: 'black',fontFamily:"serif",textAlign:"justify"}}> Update the details click the confirm and you will be automatically registered.</h5>
</div>
<br/>

        
      

    <div  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <form  style={{
          width: "40%",
          padding: "30px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white"
        }}
          onSubmit={sendData}
          >
            <div style={{ backgroundColor: "#000042", height: "10vh", width: '100%', marginBottom: '20px', borderRadius: '10px' }}>
                           <br/>
                            <h3 style={{ textAlign: 'center', color: 'white' }}> Update Registration</h3>
                             </div>
                               <br/>
                      
                        <div className="controls">
                          <div className="row">
                              <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <br />
                                <input
                                  type="text"
                                  id="fullname"
                                  name="fullname"
                                  className="form-control"
                                  value={fullname}
                                  onChange={(event) => {
                                    setFullName(event.target.value);
                                  }}
                                  pattern="[A-Za-z\s]{3,30}"
                                  required
                                  onBlur={handleFocus}
                                  focused={focused.toString()}
                                />
                              
                            </div>
  
  
                            
                              <div className="form-group">
                                <label htmlFor="address">Age</label> <br />
                                <input
                                  type="text"
                                  id="age"
                                  name="age"
                                  className="form-control"
                                  value={age}
                                  onChange={(event) => {
                                    setAge(event.target.value);
                                  }}
                                  // pattern="[A-Za-z]{3,12}"
                                  onBlur={handleFocus}
                                  required
                                  focused={focused.toString()}
                                />
                              
                            </div>
                          </div>
  
                          <div className="row">
                            
                              <div className="form-group">
                                <label htmlFor="nic">Phone Number</label>
                                <br />
                                <input
                                  type="text"
                                  id="phonenumber"
                                  name="phonenumber"
                                  className="form-control"
                                  value={phonenumber}
                                  onChange={(event) => {
                                    setPhonenumber(event.target.value);
                                  }}
                                  required
                                  onBlur={handleFocus}
                                  focused={focused.toString()}
                                />
                             
                            </div>
  
                           
                              <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  className="form-control"
                                  value={email}
                                  onChange={(event) => {
                                    setEmail(event.target.value);
                                  }}
                                  required
                                  onBlur={handleFocus}
                                  focused={focused.toString()}
                                />
                              
                            </div>
                          </div>
  
  
                          <div className="row">
                            
                              <div className="form-group">
                                <label htmlFor="doctorId">Event Code</label>
                                <br />
                                <input
                                  type="text"
                                  id="eventid"
                                  name="eventid"
                                  className="form-control"
                                  value={eventid}
                                  readOnly
                                  required
                                />
                              
                            </div>
                          </div>
                          <br/>
  
                          <div className="col-md-12">
                       <input
                              type="submit"
                              id="submit-btn"
                              className="btn btn-success btn-send pt-2 btn-block"
                              value="Confirm"
                              style={{ backgroundColor: 'blue', color: 'white' }}
                        />
                          </div>
  
                        </div>
                      </form>

                      {/* Image on the right side */}
      <img src="https://img.freepik.com/free-vector/flat-medical-conference-illustration_23-2148887153.jpg?t=st=1714882926~exp=1714886526~hmac=26f5fd1899cd39d997da012ea46a997c19a28960d8481dba9e4bb5bbab320bbb&w=996" alt="Right Side " style={{ maxWidth: '50%', marginLeft: '20px' }} />
  
                    
          </div>


     
</div>

        
        <br/>
      
    </div>
  );
}
