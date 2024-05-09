import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/AllService.css";

export default function AllPatients() {
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('asc');

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

    const sortData = (column) => {
        if (column === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const generateReport = () => {
        // Creating PDF
        const doc = new jsPDF();
        let yPos = 5;
    
        // Header
        const headers = ['Date', 'Name', 'Age', 'Gender', 'Address', 'Telephone Number', 'Service', 'Time']; // Added 'Date' as the first column
        doc.text("Patient Report", 5, yPos);
        yPos += 10;
        doc.autoTable({ startY: yPos, head: [headers], body: patients.map(patient => [patient.date?.split('T')[0], patient.name, patient.age, patient.gender, patient.address, patient.tpNumber, patient.service, patient.time]) }); // Included patient.date in the body
        doc.save('user_report.pdf');
    
        // Creating Excel
        const ws = XLSX.utils.json_to_sheet(patients.map(patient => ({ ...patient, date: patient.date?.split('T')[0] }))); // Included date in the patients object for Excel
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Patients');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout]), 'patient_report.xlsx');
    };
    

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!startDate || new Date(patient.date) >= startDate) &&
        (!endDate || new Date(patient.date) <= endDate)
    );

    const sortedPatients = filteredPatients.sort((a, b) => {
        const dateA = new Date(a[sortBy]);
        const dateB = new Date(b[sortBy]);

        if (sortOrder === 'asc') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });

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
                        <th onClick={() => sortData('date')}>Date</th>
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
                    {sortedPatients.map((patient) => (
                        <tr key={patient._id}>
                            <td>{patient.date?.split('T')[0]}</td>
                            <td>{patient.name}</td>
                            <td>{patient.email}</td>
                            <td>{patient.age}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.address}</td>
                            <td>{patient.tpNumber}</td>
                            <td>{patient.service}</td>
                            <td>{patient.time}</td>
                            <td className="tdbtn">
                                <Link className="d-button" to={{ pathname: `/dental/dentalDelete/${patient._id}`, state: { patient } }}>Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button className="default-button" onClick={generateReport}>Generate Report</button>
                <Link className="default-button" to='/dental/dentalServices'>All Services</Link>
            </div>
        </div>
    );
}
