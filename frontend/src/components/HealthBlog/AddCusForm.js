import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { successMessage } from "../HealthBlog/utils/Alert";

export default function AddCusForm() {
  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [eventid, setEventid] = useState("");
  const navigate = useNavigate();

  function sendDataform(e) {
    e.preventDefault();

    const newEventForm = {
      fullname,
      age,
      phonenumber,
      email,
      eventid,
    };

    axios
      .post("http://localhost:8070/eventform/addcus", newEventForm)
      .then((response) => {
        successMessage("Success", "Participation Added");
        const participationId = response.data.data._id;
        navigate(`/getcus/${participationId}`);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <form
        style={{
          width: "50%",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
        onSubmit={sendDataform}
      >
        <h1>Enter Your Participation Details</h1>
        <div className="form-group">
          <label for="fullname" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            placeholder="Enter Your Full Name"
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label for="age" className="form-label">
            Enter Age
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            placeholder="Enter Your Age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label for="phonenumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phonenumber"
            placeholder="Enter Your Phone Number"
            onChange={(e) => {
              setPhonenumber(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label for="email" className="form-label">
            Email Address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label for="eventid" className="form-label">
            Event ID
          </label>
          <input
            type="text"
            className="form-control"
            id="eventid"
            placeholder="Enter Event id "
            onChange={(e) => {
              setEventid(e.target.value);
            }}
          />
        </div>
        <br></br>

        <div className="col-md-12">
          <input
            type="submit"
            id="submit-btn"
            className="btn btn-success btn-send  pt-2 btn-block"
            value="Submit"
          ></input>
        </div>
      </form>
    </div>
  );
}
