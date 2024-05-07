import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Alluser.css';
import { BsSearch } from 'react-icons/bs'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin

export default function Alluser() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    function getUsers() {
      axios.get("http://localhost:8080/user/")
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`http://localhost:8080/user/delete/${userId}`);
        if (response.data.status === "User deleted") {
          alert("User deleted successfully!");
          // Update the user list after deletion
          setUsers(users.filter(user => user._id !== userId));
        } else {
          alert("Failed to delete user. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user. Please try again later.");
      }
    }
  };

  const handleSendEmail = async (email) => {
    try {
      const response = await axios.post("http://localhost:8080/send-email", {
        email,
        subject: "Pay for medicines",
        message: "Please make a payment for medicines."
      });
      alert(response.data.message); // Alert success or error message
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email. Please try again later.");
    }
  };

  const generateReport = () => {
    // Creating PDF
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Full Name', 'Number', 'Email', 'Province', 'City', 'Address']],
      body: users.map(user => [user.name, user.number, user.email, user.province, user.city, user.address]),
    });
    doc.save('user_report.pdf');
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search-bar-container">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="input-group-text">
          <BsSearch /> {/* Search icon */}
        </span>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ backgroundColor: '#f2f2f2' }}>Full Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Province</th>
            <th>City</th>
            <th>Address</th>
            <th>Description</th>
            <th>Action</th>
            <th>Send Email</th> {/* Added column for Send Email button */}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.number}</td>
              <td>{user.email}</td>
              <td>{user.province}</td>
              <td>{user.city}</td>
              <td>{user.address}</td>
              <td>{user.description}</td>
              
              
              
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => handleSendEmail(user.email)}>Send Email</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button style={{margin:"50px"}} className="btn btn-success" onClick={generateReport}>Generate Report</button>
    </div>
  );
}
