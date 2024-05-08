import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';



export default function AppointmentDetails() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    Axios.get(`http://localhost:8070/appointment/get/${id}`)
      .then((response) => {
        setAppointment(response.data.appointment);
        
          
      })
      .catch((error) => {
        console.error('Error fetching appointment:', error);
      });
  }, [id]);

  return (
    <div className="main-container">
      <div className="body-container clearfix">
        <div className="order-section-one-container container-heading">
          
          
          <div className="order-section-one-left">
            <h3>Edit Your Details Here..</h3>
          </div>
          
        </div>
        {appointment && (
          <div className="main-container" style={{ width: '100%', maxWidth: '1200px' }}>
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
                                <label htmlFor="name">Name</label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.name}
                                  name="Name"
                                  className="form-control"
                                  placeholder="Name"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.address}
                                  name="Address"
                                  className="form-control"
                                  placeholder=" Address"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="nic">NIC</label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.nic}
                                  name="Nic"
                                  className="form-control"
                                  placeholder="NIC"
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
                                  placeholder=" Email"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="contactNo">Contact No</label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.contactNo}
                                  name="ContactNo"
                                  className="form-control"
                                  placeholder="Contact No"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="date">Appointment Date</label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.date.split("T")[0]}
                                  name="date"
                                  className="form-control"
                                  placeholder="Date"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="reasonForVisit">
                                  Reason For Visit
                                </label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.reasonForVisit}
                                  name="reasonForVisit"
                                  className="form-control"
                                  placeholder="Reason For Visit"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="availableTimeslots">
                                  Appointment TimeSlot
                                </label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.availableTimeslots}
                                  name="availableTimeslots"
                                  className="form-control"
                                  placeholder="Appointment Slot"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="doctorId">Doctor ID</label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.doctorId}
                                  name="doctorId"
                                  className="form-control"
                                  placeholder="Doctor ID"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="doctorName">Doctor Name</label>
                                <br />
                                <input
                                  type="text"
                                  value={appointment.doctorName}
                                  name="doctorName"
                                  className="form-control"
                                  placeholder="Doctor Name"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="container">
                              <div className="row justify-content-end">
                                <div className="col-lg-7 mx-auto">
                                <Link
                                to={`/consultant/updateAppointment/${id}`}
                                state={{ appointment }}
                              >
                              <button
                             id="edit-details-button"
                             className="btn btn-primary"
                              style={{ width: '300px',backgroundColor: '#19197f' }} // Adjust the width as needed
                              >
                            Edit Appointment Details
                            </button>
                              </Link>

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
