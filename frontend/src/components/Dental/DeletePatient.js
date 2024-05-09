import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

export default function DeletePatient() {
  const location = useLocation();
  const [formData, setFormData] = useState(location.state || []);
  const [patientId, setPatientId] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
      setPatientId(location.state._id);
    } else {
      setPatientId(id);
    }
  }, [location.state, id]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/patients/get/${patientId}`);
        setFormData(response.data.patient);
        console.log(response.data.patient.name);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setError("An error occurred while fetching patient data.");
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this user?");

      if (!confirmed) {
        return; // Exit the function if the user cancels the deletion
      }

      const response = await axios.delete(`http://localhost:8070/patients/delete/${patientId}`);

      if (response.data.status === "User Deleted") {
        alert("User deleted successfully!");
        const url = `http://localhost:3000/dental/dentalGet`;
        window.location.href = url; // Navigate to the dentalGet page
      } else {
        alert("Failed to delete user. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h2>Delete Patient</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <>
          <p><strong>Full Name:</strong> {formData.name}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Phone Number:</strong> {formData.tpNumber}</p>
          <p><strong>Service:</strong> {formData.service}</p>
        </>
      </div>
      <div>
        <button className="btn btn-primary" onClick={handleDelete}>
          Delete Patient
        </button>
      </div>
    </div>
  );
}
