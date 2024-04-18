import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/DoctorView.css";
import { Link } from "react-router-dom";

export default function DoctorView() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function getDoctors() {
      axios
        .get("http://localhost:8070/doctor/")
        .then((res) => {
          setDoctors(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getDoctors();
  }, []);

  function searchDoctor(event) {
    setSearchQuery(event.target.value);
  }

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/doctor/delete/${id}`)
      .then((res) => {
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="body-container clearfix">
        <div className="order-section-one-container">
          <div className="order-section-one-left">
           
            <Link to="/addapp" className="appointment-link">
              Click here to make an appointment
            </Link>
          </div>
          <div className="order-section-one-right">
            <input
              type="search"
              placeholder="Search Name"
              className="search-box"
              value={searchQuery}
              onChange={searchDoctor}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead id="app-table">
              <tr>
                <th className="order-table-header-col-1" scope="col">
                  DOCTOR ID
                </th>
                <th className="order-table-header-col-1" scope="col">
                  DOCTOR NAME
                </th>
                <th className="order-table-header-col-1" scope="col">
                  SPECIALIZATION
                </th>
                <th className="order-table-header-col-1" scope="col">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr className="order-table-row" key={doctor._id}>
                  <td className="order-table-col-1">{doctor.id}</td>
                  <td className="order-table-col-1">{doctor.name}</td>
                  <td className="order-table-col-1">{doctor.specialty}</td>
                  <td className="order-table-col-1">
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(doctor._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
