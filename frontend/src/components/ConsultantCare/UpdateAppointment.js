import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams, Link} from "react-router-dom";
import { successMessage } from "./Alert";


export default function UpdateAppointment() {
  const [focused, setFocused] = useState(false);

  // Getting input values
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [nic, setNIC] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [date, setDate] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [availableTimeslots, setAvailableTimeslots] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // console.log(id);
  useEffect(() => {
    Axios.get(`http://localhost:8070/appointment/get/${id}`)
      .then((response) => {
        console.log(response);
        setName(response.data.appointment.name);
        setAddress(response.data.appointment.address);
        setNIC(response.data.appointment.nic);
        setEmail(response.data.appointment.email);
        setContactNo(response.data.appointment.contactNo);
        setDate(response.data.appointment.date);
        setReasonForVisit(response.data.appointment.reasonForVisit);
        setAvailableTimeslots(response.data.appointment.availableTimeslots);
        setDoctorId(response.data.appointment.doctorId);
        setDoctorName(response.data.appointment.doctorName);
      })
      .catch((err) => {
        console.error("Error fetching appointment:", err);
      });
  }, [id]);

  console.log(date);
  const handleFocus = () => {
    setFocused(true);
  };

  const sendData = (e) => {
    e.preventDefault();

    const updatedAppointment = {
      name,
      address,
      nic,
      email,
      contactNo,
      date,
      reasonForVisit,
      availableTimeslots,
      doctorId,
      doctorName,
    };

    Axios.put(
      `http://localhost:8080/appointment/update/${id}`,
      updatedAppointment
    )
      .then((response) => {
        console.log("Appointment updated:", response.data);
        successMessage("Success", "updated");
        navigate(`/appointmentDetails/${id}`);
      })
      .catch((err) => {
        alert("Error updating appointment: " + err);
      });
  };

  // Function to format the date to "yyyy-MM-dd"
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="main-container" >
      <div className="body-container clearfix">
        <div className="order-section-one-container container-heading">
          <div className="order-section-one-left">
            <h3>EDIT APPOINTMENT</h3>
          </div>
        </div>

        <div className="container"style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="row">
            <div className="col-lg-7 mx-auto">
              <div className="card mt-2 mx-auto p-4 bg-light">
                <div className="card-body bg-light">
                  <div className="container">
                    <form onSubmit={sendData}>
                      <div className="controls">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="name">Name</label>
                              <br />
                              <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={name}
                                onChange={(event) => {
                                  setName(event.target.value);
                                }}
                                pattern="[A-Za-z\s]{3,30}"
                                required
                                onBlur={handleFocus}
                                focused={focused.toString()}
                              />
                              <span id="nameSpan">
                                Name should be 3-30 letters and shouldn't
                                include any numbers or special characters!
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="address">Address</label> <br />
                              <input
                                type="text"
                                id="address"
                                name="address"
                                className="form-control"
                                value={address}
                                onChange={(event) => {
                                  setAddress(event.target.value);
                                }}
                                pattern="[A-Za-z]{3,12}"
                                onBlur={handleFocus}
                                required
                                focused={focused.toString()}
                              />
                              <span id="addressSpan">
                                Address should be 5-40 letters.
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="nic">NIC</label>
                              <br />
                              <input
                                type="text"
                                id="nic"
                                name="nic"
                                className="form-control"
                                value={nic}
                                onChange={(event) => {
                                  setNIC(event.target.value);
                                }}
                                pattern="(([0-9][vV]|[0-9])){12,13}"
                                required
                                onBlur={handleFocus}
                                focused={focused.toString()}
                              />
                              <span id="nicSpan">
                                NIC should be only 12 digits or 12 digits and
                                letter V and shouldn't include any other letters
                                or special characters!
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
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
                              <span id="emailSpan">
                                Please enter a valid email address!
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="contactNo">Contact No</label>
                              <input
                                type="text"
                                id="contactNo"
                                name="contactNo"
                                className="form-control"
                                value={contactNo}
                                onChange={(event) => {
                                  setContactNo(event.target.value);
                                }}
                                pattern="^[0-9]{10}$"
                                required
                                onBlur={handleFocus}
                                focused={focused.toString()}
                              />
                              <span id="contactNoSpan">
                                Contact number should contain 10 numbers and
                                shouldn't include any letters or special
                                characters!
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="date">Date</label>
                              <br />
                              <input
                                type="date"
                                id="date"
                                name="date"
                                className="form-control"
                                value={date ? formatDate(date) : ""}
                                onChange={(event) => {
                                  setDate(event.target.value);
                                }}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="reasonFrVisit">
                                Reason For Visit
                              </label>
                              <br />
                              <select
                                id="reasonForVisit"
                                name="reasonForVisit"
                                className="form-control"
                                value={reasonForVisit}
                                onChange={(event) => {
                                  setReasonForVisit(event.target.value);
                                }}
                                required
                              >
                                <option value="General Checkup">
                                  General CheckUp
                                </option>
                                <option value="Medical Concerns">
                                  Medical Concerns
                                </option>
                                <option value="Preventive Care">
                                  Preventive Care
                                </option>
                                <option value="other">Other</option>
                              </select>
                              <span>
                                Please select a reason for the appointment from
                                the given list!
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="availableAppointmentSlot">
                                Appointment Slot
                              </label>
                              <br />
                              <select
                                id="availableAppointmentSlot"
                                name="availableAppointmentSlot"
                                className="form-control"
                                value={availableTimeslots}
                                onChange={(event) => {
                                  setAvailableTimeslots(event.target.value);
                                }}
                                required
                              >
                                <option value="8.00AM-8.30AM">
                                  8.00AM-8.30AM
                                </option>
                                <option value="8.30AM-9.00AM">
                                  8.30AM-9.00AM
                                </option>
                                <option value="9.30AM-10.00AM">
                                  9.30AM-10.00AM
                                </option>
                                <option value="10.00AM-10.30AM">
                                  10.00AM-10.30AM
                                </option>
                                <option value="6.00PM-6.30PM">
                                  6.00PM-6.30PM
                                </option>
                                <option value="6.30PM-7.00PM">
                                  6.30PM-7.00PM
                                </option>
                                <option value="7.00PM-7.30PM">
                                  7.00PM-7.30PM
                                </option>
                                <option value="7.30PM-8.00PM">
                                  7.30PM-8.00PM
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="doctorId">Doctor ID</label>
                              <br />
                              <select
                                      type="text"
                                      id="doctorId"
                                      name="doctorId"
                                      className="form-control"
                                      value={doctorId}
                                      onChange={(event) => {
                                        setDoctorId(event.target.value);
                                      }}
                                      required
                                      >
                                        <option value="0" selected disabled>
                                        --Select DoctorID Slot--
                                      </option>
                                      <option value="D01">
                                        D01
                                      </option>
                                      <option value="D02">
                                        D02
                                      </option>
                                      <option value="D03">
                                        D03
                                      </option>
                                      <option value="D04">
                                        D04
                                      </option>
                                      <option value="D05">
                                        D05
                                      </option>
                                      <option value="D06">
                                        D06
                                      </option>
                                      <option value="D07">
                                        D07
                                      </option>
                                      <option value="D08">
                                        D08
                                      </option>
                                    </select>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="doctorName">Doctor Name</label>
                              <br />
                              <select
                                      type="text"
                                      id="doctorName"
                                      name="doctorName"
                                      className="form-control"
                                      value={doctorName}
                                      onChange={(event) => {
                                        setDoctorName(event.target.value);
                                      }}
                                      required
                                    > <option value="0" selected disabled>
                                    --Select DoctorName Slot--
                                  </option>
                                  
                                  <option value="Dr.Nilushi Perera">
                                  Dr.Nilushi Perera
                                  </option>
                                  <option value="Dr.Hemantha Perera">
                                  Dr.Hemantha Perera
                                  </option>
                                  <option value="Dr.Rahul Jayasinghe">
                                  Dr.Rahul Jayasinghe
                                  </option>
                                  <option value="Dr.Mahen Jayawardhana">
                                  Dr.Mahen Jayawardhana
                                  </option>
                                  <option value="Dr.Shirani Pathirana">
                                  Dr.Shirani Pathirana
                                  </option>
                                  <option value="Dr.Pavai Weerasinghe">
                                  Dr.Pavai Weerasinghe
                                  </option>
                                  <option value="Dr.Shanel Perera">
                                  Dr.Shanel Perera
                                  </option>
                                  <option value="Dr.Supul Jayaweera">
                                  Dr.Supul Jayaweera"
                                  </option>
                                </select>
                            </div> 
                          </div>
                        </div>
                        <div className="container">
  <div className="row justify-content-between align-items-center">
    <div className="col-lg-4">
      <button
        id="edit-details-button"
        className="btn btn-primary mr-2"
        onClick={sendData}
        style={{ float: "left" }} // Move the button to the left corner
      >
        Update Appointment
      </button>
    </div>
    <div className="col-lg-4">
      <Link to={`/`}>
        <button className="btn btn-success" style={{ float: "right" }}> // Move the button to the right corner
          Pay Now
        </button>
      </Link>
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
      </div>
    </div>
  );
}
