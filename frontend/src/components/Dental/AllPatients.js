import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export default function AllPatients() {
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        function getPatients() {
            axios.get("http://localhost:8070/patients")
                .then((res) => {
                    setPatients(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }

        getPatients();
    }, []);

    const handleDelete = async (patientId) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this user?");
            
            if (!confirmed) {
                return; // Exit the function if the user cancels the deletion
            }
    
            const response = await axios.delete(`http://localhost:8070/patients/delete/${patientId}`);
            
            if (response.data.status === "User Deleted") {
                setPatients(patients.filter(patient => patient._id !== patientId));
                alert("User deleted successfully!");
            } else {
                alert("Failed to delete user. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user. Please try again later.");
        }
    };
    
    const generateReport = () => {
        // Creating PDF
        const doc = new jsPDF();
        let yPos = 10;
        patients.forEach(patient => {
          doc.text(`Name: ${patient.name}, Email: ${patient.email}, Age: ${patient.age}, Gender: ${patient.gender}, Address: ${patient.address}, Telephone Number: ${patient.tpNumber}, Service: ${patient.service}, Time: ${patient.time}`, 10, yPos);
          yPos += 10;
        });
        doc.save('user_report.pdf');
    
        // Creating Excel
        const ws = XLSX.utils.json_to_sheet(patients);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Patients');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout]), 'patient_report.xlsx');
      };
      

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1>All Patients</h1>
            <table className="patient-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Telephone Number</th>
                        <th>Service</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatients.map((patient) => (
                        <tr key={patient._id}>
                            <td>{patient.name}</td>
                            <td>{patient.email}</td>
                            <td>{patient.age}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.address}</td>
                            <td>{patient.tpNumber}</td>
                            <td>{patient.service}</td>
                            <td>{patient.time}</td>
                            <td className="tdbtn">
                                <Link className="u-button" to={{ pathname: `/update/${patient._id}`, state: patient }}>Update</Link>
                                <button className="d-button" onClick={() => handleDelete(patient._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button className="default-button" onClick={generateReport}>Generate Report</button>
            </div>
        </div>
    );
}
