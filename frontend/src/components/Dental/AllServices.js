import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';

export default function AllPatients() {
    const [service, setService] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        function getServices() {
            axios.get("http://localhost:8070/services")
                .then((res) => {
                    setService(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }

        getServices();
    }, []);

    const handleDelete = async (serviceId) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this user?");
            
            if (!confirmed) {
                return; // Exit the function if the user cancels the deletion
            }
    
            const response = await axios.delete(`http://localhost:8070/services/delete/${serviceId}`);
            
            if (response.data.status === "user deleted") {
                alert("User deleted successfully!");
                setService(service.filter(service => service._id !== serviceId));
            } else {
                alert("Failed to delete user. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user. Please try again later.");
        }
    };
    
        

    const filteredUsers = service.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="patient-table-container">
            <div className="search-bar-container">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="input-group-text">
                    <BsSearch/> {/* Search icon */}
                </span>
            </div>
            <h1>All Services</h1>
            <table className="patient-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((service) => (
                        <tr key={service.id}>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td className="tdbtn">
                                <Link className="u-button" to="/update">Update</Link>
                                <button className="d-button" onClick={() => handleDelete(service._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <Link className="default-button" to='/addService'>Add Service</Link>
                <Link className="default-button" to='/'>All Patients</Link>
            </div>
        </div>
    );
}
