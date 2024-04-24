import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../Dental/images/bg.jpg"; 

export default function AddPatient() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [tpNumber, setTpNumber] = useState("");
    const [service, setService] = useState("");
    const [serviceOptions, setServiceOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8070/services/")
            .then(response => {
                setServiceOptions(response.data);
            })
            .catch(error => {
                console.error("Error fetching service options:", error);
            });
    }, []);

    function sendData(e) {
        e.preventDefault();

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Phone number validation regex (10 digits)
        const phoneRegex = /^\d{10}$/;

        // Validation
        if (
            !name ||
            !email ||
            !emailRegex.test(email) ||
            !age ||
            !gender ||
            !address ||
            !tpNumber ||
            !phoneRegex.test(tpNumber) ||
            !service
        ) {
            alert("Please fill in all fields with valid data.");
            return;
        }

        const newPatient = { name, email, age, gender, address, tpNumber, service };

        axios.post("http://localhost:8070/patients/add", newPatient)
            .then(() => {
                alert("Patient Added !");
                navigate('/update/:id', { state: newPatient });
            })
            .catch((err) => {
                alert(err);
            });
    }

    return(

        <div className="container">
        <h2>User Information Form</h2>
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>

                    <input type="text" id="name" name="name" required 
                    onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required 
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age:</label>

                    <input type="number" id="age" name="age" required onChange={(e) => {
                        setAge(e.target.value);
                    }} />
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>

                    <select id="gender" name="gender" value={gender} required
                    onChange={(e) => {
                        setGender(e.target.value);
                    }}>

                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address:</label>

                    <input type="text" id="address" name="address" required 
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }} />
                </div>

                <div className="form-group">
                    <label htmlFor="tpNumber">Telephone Number:</label>
                    <input
                        type="text"
                        id="tpNumber"
                        name="tpNumber"
                        required
                        onChange={(e) => {
                            setTpNumber(e.target.value);
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="service">Service:</label>
                    <select
                        id="service"
                        name="service"
                        value={service}
                        required
                        onChange={(e) => {
                            setService(e.target.value);
                        }}
                    >
                        <option value="">Select</option>
                        {serviceOptions.map(option => (
                            <option key={option._id} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                <input type="submit" value="Submit" />
            </form>
      </div>

    )
}
