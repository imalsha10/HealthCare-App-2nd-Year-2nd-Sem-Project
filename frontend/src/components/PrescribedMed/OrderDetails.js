import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function OrderDetails() {
  const location = useLocation();
  const [formData, setFormData] = useState(location.state || {});
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
    }
  }, [location.state]);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleConfirm = async () => {
    if (window.confirm("Are you sure you want to update the data?")) {
      try {
        const response = await axios.put(`http://localhost:8080/user/update/${formData._id}`, formData);
        if (response.data.status === "user updated") {
          alert("User updated successfully!");
          setIsEdit(false);
          // Optional: Fetch updated data or redirect to another page
        } else {
          setError("Update failed! Please check the error message from the server.");
        }
      } catch (error) {
        console.error("Error updating user data:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        }
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <h2>User Details</h2>
      {error && <div className="error">{error}</div>}
      <div className="customer-details">
        {isEdit ? (
          <>
            <p>
              <strong>Full Name:</strong>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </p>
            <p>
              <strong>Number:</strong>
              <input type="text" name="number" value={formData.number} onChange={handleChange} />
            </p>
            <p>
              <strong>Email:</strong>
              <input type="email" name="email" value={formData.email} onChange={handleChange} disabled />
            </p>
            <p>
              <strong>Province:</strong>
              <input type="text" name="province" value={formData.province} onChange={handleChange} />
            </p>
            <p>
              <strong>City:</strong>
              <input type="text" name="city" value={formData.city} onChange={handleChange} />
            </p>
            <p>
              <strong>Address:</strong>
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </p>
          </>
        ) : (
          <>
            <p><strong>Full Name:</strong> {formData.name}</p>
            <p><strong>Number:</strong> {formData.number}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Province:</strong> {formData.province}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>Address:</strong> {formData.address}</p>
          </>
        )}
      </div>
      <div className="button-container">
        {isEdit ? (
          <button className="btn btn-primary" onClick={handleConfirm}>
            Update User
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit
          </button>
        )}
        <button className="btn btn-primary" disabled>
          Confirm
        </button>
      </div>
    </div>
  );
}
