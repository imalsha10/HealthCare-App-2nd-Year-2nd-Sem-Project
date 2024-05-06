import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/AddBlogs.css";
//import jsPDF from "jspdf";
//import "jspdf-autotable";

export default function ViewCus() {
  const [viewdetails, setViewdetails] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");

  useEffect(() => {
    function getviewdetails() {
      axios
        .get("http://localhost:8070/eventform/cus")
        .then((res) => {
          setViewdetails(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getviewdetails();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/eventform/deletecus/${id}`)
      .then(() => {
        setViewdetails(
          viewdetails.filter((viewdetailcus) => viewdetailcus._id !== id)
        );
        alert("Successfully Deleted");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  /*const generateReport = () => {
    const doc = new jsPDF();
  
    // Add header
    doc.setFontSize(20);
    doc.text("Event Participation Report", 14, 15);
    
    // Add table header
    const headers = [['Full Name', 'Age', 'Phone Number', 'Email', 'Event ID']];
    
    // Add table data
    const data = viewdetails.map(({ fullname, age, phonenumber, email, eventid }) => [fullname, age, phonenumber, email, eventid]);
    
    // AutoTable plugin to generate table
    doc.autoTable({
      startY: 25,
      head: headers,
      body: data,
    });
  
    doc.save("appointments_report.pdf");
  };*/
  

  const handleEventIdChange = (event) => {
    setSelectedEventId(event.target.value);
  };

  const uniqueEventIds = Array.from(
    new Set(viewdetails.map((detail) => detail.eventid))
  );

  return (
    <div style={{ 
     backgroundColor:"#F9FEFF",
     padding: '20px'
    }}>
    <div className="container">
      <header>
        <div className="topic">Health Blog</div>
        <nav>
        <Link to="/add" style={{ backgroundColor: 'darkblue', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', marginRight: '10px' }}>Create Blog or Event</Link>
        <Link to="/" style={{ backgroundColor: 'darkblue', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>Health Blog</Link>

          

        </nav>
      </header>

      <h3 style={{ textAlign: 'center', color: 'darkblue' ,fontSize:'50px'}}>Event Participation Details</h3>

      <div className="form-group mb-2">
        <label htmlFor="eventid form-label" style={{fontSize:"20px",fontFamily:"Arial"}}>Select Event ID:</label>
        <select
          className="form-control"
          id="eventid"
          value={selectedEventId}
          onChange={handleEventIdChange}
        >
          <option value="">All</option>
          {uniqueEventIds.map((eventId) => (
            <option key={eventId} value={eventId}>
              {eventId}
            </option>
          ))}
        </select>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Age</th>
            <th>PhoneNumber</th>
            <th>Email</th>
            <th>EventId</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {viewdetails
            .filter(
              (detail) =>
                selectedEventId === "" || detail.eventid === selectedEventId
            )
            .map((viewdetailcus) => (
              <tr key={viewdetailcus._id}>
                <td>{viewdetailcus.fullname}</td>
                <td>{viewdetailcus.age}</td>
                <td>{viewdetailcus.phonenumber}</td>
                <td>{viewdetailcus.email}</td>
                <td>{viewdetailcus.eventid}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(viewdetailcus._id)}
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
  );
}
