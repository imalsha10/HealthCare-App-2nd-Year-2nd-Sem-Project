import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { handleUpload } from "./HandleUpload";
import { successMessage } from "./Alert";
import "../../css/doctor.css"

export default function AddDoctor() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const[description,setDescription]=useState("");
  const [img, setImg] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  const sendData = (e) => {
    e.preventDefault();

    const newDoctor = {
      id,
      name,
      specialty,
      img,
      description,
    };

    axios
      .post("http://localhost:8070/doctor/add", newDoctor)
      .then(() => {
        successMessage("Success", "Doctor Added");
        setImg("");
        setFile("");
        setId("");
        setName("");
        setSpecialty("");
        setDescription("");
        setPercent(0);
      })
      .catch((err) => {
        alert("Error adding doctor: " + err);
      });
  };

  const handleImageUpload = (e) => {
    handleUpload({ file, setPercent, setFunc: setImg });
  };

  // Handle blog image change
  function handleImageChange(event) {
    setFile(event.target.files[0]);
  }

  return (
    
    <div className="main-container">
      <form className="add-doctor-container" onSubmit={sendData}>
        <div className="title_add">
          <h2>Add Doctor Details</h2>
        </div>
        <div className="Dochalf">
          <div className="Docitem">
            <label
              htmlFor="img"
              className="form-label"
              style={{ fontWeight: "500" }}
            >
              Photo
            </label>
            <input
              type="file"
              className="form-control"
              id="img"
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
                className={`progress-bar bg-primary ${
                  percent < 100
                    ? "progress-bar-striped progress-bar-animated"
                    : ""
                }`}
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={percent}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {percent < 100
                  ? `Uploading ${percent}%`
                  : `Uploaded ${percent}%`}
              </div>
            </div>
            <br />
            <label htmlFor="id">Doctor ID</label>
            <input
              className="doctor"
              type="text"
              id="id"
              placeholder="Enter Doctor ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <br />
          <div className="Docitem">
            <label htmlFor="name">Name</label>
            <input
              className="doctor"
              type="text"
              id="name"
              placeholder="Enter Doctor Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br />
          <div className="Docitem">
            <label htmlFor="specialty">Specialty</label>
            <input
              className="doctor"
              type="text"
              id="specialty"
              placeholder="Enter Doctor Specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />
          </div>
          <div className="Docitem">
            <label htmlFor="description">Description</label>
            <input
              className="doctor"
              type="text"
              id="description"
              placeholder="Enter Doctor Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="Dochalf">{/* Remaining form inputs */}</div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        
      </form>
      <Link to="/consultant/view">
          <button style={{marginLeft:"240px"}} className="btn btn-primary">view appointment</button>
        </Link>
    </div>
  );
}
