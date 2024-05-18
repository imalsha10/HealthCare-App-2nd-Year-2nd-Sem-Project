import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../../css/appointmentview.css";



export default function Appointments() {
  const [Appointments, setAppointments] = useState([]);
  const [serQuary, setSerQuary] = useState("");

  useEffect(() => {
    function getAppointments() {
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
    getAppointments();
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

  const generateReport = () => {
    // Get current date
    const currentDate = new Date().toLocaleDateString();

    // Create a new jsPDF document
    const doc = new jsPDF();

    // Add title and current date to the report
    doc.text("Appointments Report", 10, 10);
    doc.text(`Date: ${currentDate}`, 10, 20);

    // Define table headers
    const headers = [
      "Name",
      "NIC",
      "Address",
      "Contact No",
      "Date",
      "Reason For Visit",
      "Appointment Time",
      "Doctor Name",
    ];

    // Define data rows based on Appointments data
    const data = Appointments.map((appointment) => [
      appointment.name,
      appointment.nic,
      appointment.address,
      appointment.contactNo,
      appointment.date.split("T")[0],
      appointment.reasonForVisit,
      appointment.availableTimeslots,
      appointment.doctorName,
    ]);

    // Set table properties
    const tableProps = {
      margin: { top: 30 },
    };

    // Add table to the document
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 40, // Start table at vertical position 40
      ...tableProps,
    });

    // Save the PDF with a filename containing the current date
    doc.save(`appointments_report_${currentDate}.pdf`);
  };

  return (
    <div className="main-container">
      <div className="order-section-one-container ">
        <div className="order-section-one-left ">
          <h3 style={{ marginLeft: "25px", marginRight: "5px" }}>
            ALL APPOINTMENTS
          </h3>
          <div className="generate-report-btn">
            <button className="btn btn-primary" onClick={generateReport}>
              Generate Report
            </button>
          </div>
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
