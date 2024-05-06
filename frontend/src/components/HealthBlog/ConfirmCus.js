import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link ,useNavigate} from "react-router-dom";
import "../../css/AddBlogs.css";

export default function ConfirmCus() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8070/eventform/getcus/${id}`)
      .then((response) => {
        // Update to use the correct data path
        setAppointment(response.data.eventform);
      })
      .catch((error) => {
        console.error("Error fetching appointment:", error);
      });
  }, [id]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/eventform/deletecus/${id}`)
      .then((response) => {
        console.log("Participation details deleted successfully");
        alert("Participation details deleted successfully");
        navigate("/"); // Navigate to desired page after deletion
      })
      .catch((error) => {
        console.error("Error deleting participation details:", error);
        alert(error.message);
      });
  };
 
  
  const handleEdit = () => {
    navigate(`/updatecus/${id}`); // Navigate to EditDetails page with the appointment id
  };

  

  

  return (
    <div className="main-container" style={{ 
      backgroundImage: 'url("https://img.freepik.com/free-photo/elegant-white-background-with-blue-wave-lines_1017-32741.jpg?t=st=1714910283~exp=1714913883~hmac=c681016ba767c121f58becf9b05631f85caeebe658e8ba63a62ac9a3fb6c566d&w=1380")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px', 
      
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    }} >
     
      
        <div className="container ">
        <header>
      <div className="topic" style={{color:'black'}}>Health Blog</div>
    </header>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', width: '50%' }}>
  <h1 style={{ color: 'darkblue',margin: '0', marginBottom: '10px' ,fontFamily:"serif"}}>Save the Date.Live Your Best Life!..</h1>
  <h3 style={{color:'#005fbb',fontFamily:"serif",textAlign:"justify"}}> Free Event & Enjoy this Valuable Chance </h3>
  
  <h5 style={{ color: 'black',fontFamily:"serif",textAlign:"justify"}}> Confirm your details in the Event Registration Form below and you will be automatically registered or if you want update your details please click the Edit details and update it.</h5>
</div>
<br/>
        
        
        {appointment && (
        
                    <div  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    
                      <form style={{
          width: "40%",
          padding: "30px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white"
        }}>


                <div style={{ backgroundColor: "#000042", height: "10vh", width: '100%', marginBottom: '20px', borderRadius: '10px' }}>
                              <br/>
                            <h3 style={{ textAlign: 'center', color: 'white' }}> Confirm Registration</h3>
                           </div>
                            <br/>


                        <div className="controls">
                          <div className="row">
                          
                            
                              <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.fullname}
                                  name="name"
                                  className="form-control"
                                  placeholder="Name"
                                  readOnly
                                />
                             
                            </div>
                            
                              <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.age}
                                  name="Age"
                                  className="form-control"
                                  placeholder="Age"
                                  readOnly
                                />
                              
                            </div>
                            
                              <div className="form-group">
                                <label htmlFor="phonenumber">
                                  Phone Number
                                </label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.phonenumber}
                                  name="phonenumber"
                                  className="form-control"
                                  placeholder="Phone Number"
                                  readOnly
                                />
                              
                            </div>
                            
                              <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.email}
                                  name="Email"
                                  className="form-control"
                                  placeholder="Email"
                                  readOnly
                                />
                              
                            </div>

                           
                              <div className="form-group">
                                <label htmlFor="eventid">Event Code</label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.eventid}
                                  name="eventid"
                                  className="form-control"
                                  placeholder="Event Code"
                                  readOnly
                                />
                              
                            </div>

                           

                            <div className="container">
                              
                                <br/>
                                  <button
                                    id="edit-details-button"
                                    className="btn btn-primary"
                                    onClick={handleEdit}
                                    style={{ marginRight: '10px' }}
                                  >
                                    Edit Details
                                  </button>

                                  <button
                                      id="delete-details-button"
                                      className="btn btn-danger mr-2"
                                      onClick={handleDelete}
                                      style={{ marginRight: '10px' }}
                                     >Cancel Participation
                                 </button>

                                 <Link to="/" className="btn btn-primary" style={{ backgroundColor: '#890089' ,borderColor:"#890089"}}>Confirm</Link>

                                
                              
                            </div>

                          </div>
                        </div>
                      </form>
                      
                      <img src="https://img.freepik.com/premium-vector/doctor-gives-training-lecture-about-anatomy-students-doctor-presenting-human-kidneys_625536-2717.jpg"  alt="Right Side " style={{ maxWidth: '50%', marginLeft: '20px' }} />
                   
          </div>
        )}
      </div>
    </div>
  );
}
