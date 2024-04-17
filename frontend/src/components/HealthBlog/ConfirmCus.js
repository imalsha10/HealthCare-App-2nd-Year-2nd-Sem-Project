import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link ,useNavigate} from "react-router-dom";

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
        navigate("/"); // Navigate to desired page after deletion
      })
      .catch((error) => {
        console.error("Error deleting participation details:", error);
        alert(error.message);
      });
  };
 
  
  const handleEdit = (id) => {
    navigate(`/updatecus/${id}`); // Navigate to EditDetails page with the appointment id
  };


  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="main-container">
      <div className="body-container clearfix">
        <div className="order-section-one-container ">
          <div className="order-section-one-left ">
            <h3 style={{ marginLeft: "25px", marginRight: "5px" }}>
              Confirm Your Participation
            </h3>
          </div>
          <div className="order-section-one-right">
            <Link to="/">
              <button
                id="report-button"
                className="btn btn-outline-info btn-sm"
                onClick={handlePrint}
              >
                <i className="fa-sharp fa-solid fa-download"></i>&nbsp;Print
                Appointment
              </button>
            </Link>
          </div>
        </div>
        {appointment && (
          <div className="container">
            <div className="row">
              <div className="col-lg-7 mx-auto">
                <div className="card mt-2 mx-auto p-4 bg-light">
                  <div className="card-body bg-light">
                    <div className="container">
                      <form>
                        <div className="controls">
                          <div className="row">
                            <div className="col-md-6">
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
                            </div>
                            <div className="col-md-6">
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
                            </div>
                            <div className="col-md-6">
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
                            </div>
                            <div className="col-md-6">
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
                            </div>

                            <div className="col-md-6">
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
                            </div>

                            <div className="container">
                              <div className="row justify-content-end">
                                <div className="col-lg-7 mx-auto">
                                  <button
                                    id="edit-details-button"
                                    className="btn btn-primary"
                                    onClick={handleEdit}
                                  >
                                    Edit Details
                                  </button>
                                  <button
                                      id="delete-details-button"
                                      className="btn btn-danger mr-2"
                                      onClick={handleDelete}
                                     >Cancel Participation
                                 </button>

                                  <Link to="/" className="btn btn-primary">Confirm</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
