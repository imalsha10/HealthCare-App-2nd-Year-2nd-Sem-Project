import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/appointmentview.css";

export default function Appointments() {
  const [Appointments, setAppointments] = useState([]);
  const [serQuary, setSerQuary] = useState("");

  useEffect(() => {
    function getAppoinments() {
      axios
        .get("http://localhost:8070/appointment/view")
        .then((res) => {
          console.log(res.data.success);
          setAppointments(res.data.existingAppointments);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getAppoinments();
  }, []);

  function searchAppointment(event) {
    setSerQuary(event.target.value);
  }

  const deleteData = (appointment) => {
    var result = window.confirm("Do you want to delete this appointment?");
    console.log(result);
    if (result === true) {
      axios
        .delete(`http://localhost:8070/appointment/delete/${appointment._id}`)
        .then((res) => {})
        .catch((appointment) => {
          alert(appointment);
        });
    } else {
      appointment.preventDefault();
    }
  };

  return (
    <div className="main-container">
      <div className="order-section-one-container ">
        <div className="order-section-one-left ">
          <h3 style={{ marginLeft: "25px", marginRight: "5px" }}>
            ALL APPOINTMENTS
          </h3>
        </div>
      </div>

      <div className="order-section-two-container">
        <table Class="table">
          <thead id="app-table">
            <tr>
              <th className="order-table-header-col-1" scope="col">
                #
              </th>

              <th className="order-table-header-col-1" scope="col">
                Name
              </th>
              <th className="order-table-header-col-1" scope="col">
                NIC
              </th>
              <th className="order-table-header-col-1" scope="col">
                Address
              </th>
              <th className="order-table-header-col-1" scope="col">
                ContactNo
              </th>
              <th className="order-table-header-col-1" scope="col">
                Date
              </th>
              <th className="order-table-header-col-1" scope="col">
                Reason For Visit
              </th>
              <th className="order-table-header-col-1" scope="col">
                Appointment Time
              </th>
              <th className="order-table-header-col-1" scope="col">
                Doctor Name
              </th>
              <th className="order-table-header-col-1" scope="col">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {Appointments.filter(
              (appointment) =>
                appointment.nic.includes(serQuary) ||
                appointment._id.includes(serQuary) ||
                appointment.name.toLowerCase().includes(serQuary) ||
                appointment.name.includes(serQuary)
            ).map((appointment, index) => (
              <tr className="order-table-row" key={appointment.name}>
                <th className="order-table-col-1" scope="row">
                  {index + 1}
                </th>

                <td className="order-table-col-1">
                  <a
                    href={"/appointmentDetails/" + appointment._id}
                    style={{ textDecoration: "none" }}
                  >
                    {appointment.name}
                  </a>
                </td>
                <td className="order-table-col-1">{appointment.nic}</td>
                <td className="order-table-col-1">{appointment.address}</td>
                <td className="order-table-col-1">{appointment.contactNo}</td>

                <td className="order-table-col-1">
                  {appointment.date.split("T")[0]}
                </td>
                <td className="order-table-col-1">
                  {appointment.reasonForVisit}
                </td>
                <td className="order-table-col-1">
                  {appointment.availableTimeslots}
                </td>
                <td className="order-table-col-1">{appointment.doctorName}</td>
                <td id="action-button">
                  <a
                    href={"./updateAppointment/" + appointment._id}
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      id="table-button"
                      className="btn btn-outline-primary btn-sm"
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </button>
                  </a>
                  &nbsp;
                  <a href="#">
                    <button
                      id="table-button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        deleteData(appointment);
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                    </button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
