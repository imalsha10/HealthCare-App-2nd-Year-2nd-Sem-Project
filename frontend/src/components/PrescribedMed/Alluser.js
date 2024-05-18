import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Alluser.css";
import { BsSearch } from "react-icons/bs";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the autoTable plugin
import { Link } from "react-router-dom";
import SendEmail from "./SendEmail";
import { useUserStore } from "../PrescribedMed/store/useUserStore";

export default function Alluser() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { setSelectedUser, openSendEmailModal } = useUserStore((state) => ({
    openSendEmailModal: state.openSendEmailModal,
    setSelectedUser: state.setSelectedUser,
  }));

  useEffect(() => {
    function getUsers() {
      axios
        .get("http://localhost:8070/user/")
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
        const response = await axios.delete(
          `http://localhost:8070/user/delete/${userId}`
        );
        if (response.data.status === "User deleted") {
          alert("User deleted successfully!");
          // Update the user list after deletion
          setUsers(users.filter((user) => user._id !== userId));
        } else {
          alert("Failed to delete user. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert(
          "An error occurred while deleting the user. Please try again later."
        );
      }
    }
  };

  const handleSendEmail = async (user) => {
    setSelectedUser(user);
    openSendEmailModal();
  };

  const generateReport = () => {
    // Creating PDF
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Full Name", "Number", "Email", "Province", "City", "Address"]],
      body: users.map((user) => [
        user.name,
        user.number,
        user.email,
        user.province,
        user.city,
        user.address,
      ]),
    });
    doc.save("user_report.pdf");
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <SendEmail />
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
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
              }}
            >
              FullName
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              Number
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              Email
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
              }}
            >
              Province
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
              }}
            >
              City
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
              }}
            >
              Address
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
              }}
            >
              Description
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
              }}
            >
              Prescription
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
              }}
            >
              Action
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
              }}
            >
              SendEmail
            </th>{" "}
            {/* Added column for Send Email button */}
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
                <div className="card" key={user._id}>
                  <img src={user.image} alt="user's prescription" style={{ width: "100%" }} />
                </div>
              </td>

              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleSendEmail(user)}
                  className="btn btn-primary"
                >
                  SendEmail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        style={{ margin: "50px" }}
        className="btn btn-success"
        onClick={generateReport}
      >
        Generate Report
      </button>
    </div>
  );
}
