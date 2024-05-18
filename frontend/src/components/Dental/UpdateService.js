import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, Link } from "react-router-dom";

export default function UpdateService() {
  const location = useLocation();
  const [formData, setFormData] = useState(location.state || { name: "", description: "", price: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
      setServiceId(location.state._id);
    } else {
      setServiceId(id);
    }
  }, [location.state, id]);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/services/get/${serviceId}`);
        setFormData(response.data.service); 
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setError("An error occurred while fetching patient data.");
      }
    };

    if (serviceId) {
      fetchServiceData();
    }
  }, [serviceId]);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleConfirm = async () => {
    if (!serviceId) {
      setError("Service ID is missing. Please try again later.");
      return;
    }

    if (window.confirm("Are you sure you want to update the data?")) {
      try {
        const response = await axios.put(`http://localhost:8070/services/update/${serviceId}`, formData);
        if (response.data.status === "Service Updated") {
          alert("Service updated successfully!");
          setIsEdit(false);
        } else {
          setError("Update failed! Please check the error message from the server.");
        }
      } catch (error) {
        console.error("Error updating patient data:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        }
        setError("An error occurred. Please try again later.");
      }
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Update Service</h2>
      {error && <div className="error">{error}</div>}
      <div>
        {isEdit ? (
          <>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Description:</strong> {formData.description}</p>
            <p><strong>Price:</strong> {formData.price}</p>
          </>
        )}
      </div>
      <div>
        {isEdit ? (
          <button className="btn btn-primary" onClick={handleConfirm}>
            Update Service
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit
          </button>
        )}
        <Link className="btn btn-primary" to='/dental/success'>
          Confirm
        </Link>
      </div>
    </div>
  );
}
