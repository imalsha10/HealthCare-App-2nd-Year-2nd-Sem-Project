import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/AddPatient.css";

export default function AddPatient() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [tpNumber, setTpNumber] = useState("");
    const [service, setService] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("")
    const [selectedService, setSelectedService] = useState(null);
    const [serviceOptions, setServiceOptions] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8070/services/")
            .then(response => {
                setServiceOptions(response.data);
            })
            .catch(error => {
                console.error("Error fetching service options:", error);
            });

        const now = new Date();
        const hours = now.getHours();
        if (hours >= 19 && hours <= 24) {
            const tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() + 1);
            setDate(tomorrow.toISOString().split('T')[0]);
        } else {
            setDate(now.toISOString().split('T')[0]);
        }

        if (location.state && location.state.selectedSlot) {
            setTime(location.state.selectedSlot);
        }
    }, [location.state]);

    useEffect(() => {
        if (selectedService) {
            const serviceObj = serviceOptions.find(option => option.name === selectedService);
            if (serviceObj) {
                setPrice(serviceObj.price);
            }
        }
    }, [selectedService, serviceOptions]);

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
            !service ||
            !time
        ) {
            setErrMsg("Please fill in all fields with valid data.");
            return;
        }

        const newPatient = { date, name, email, age, gender, address, tpNumber, service, time, price }; // Include price field

        axios.post("http://localhost:8070/patients/add", newPatient)
            .then((response) => {
                const patientId = response.data.patientId;
                if (patientId) {
                    alert("Patient Added !");
                    navigate(`/dental/dentalUpdate/${patientId}`);
                } else {
                    alert("Failed to retrieve patient ID from the server.");
                }
            })
            .catch((err) => {
                alert("Error adding patient: " + err);
            });
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR'
        }).format(price);
    };

    return (
        <div className="container">
            <h2>User Information Form</h2>
            {errMsg && <p className="errmsg" aria-live="assertive">{errMsg}</p>}
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label>Date:</label>
                    <label>{date}</label>
                </div>

                <div className="form-group">
                    <label>Time:</label>
                    <label>{time}</label>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required
                        onChange={(e) => {
                            setName(e.target.value);
                            setErrMsg('');
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrMsg('');
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" required
                        onChange={(e) => {
                            setAge(e.target.value);
                            setErrMsg('');
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={gender} required
                        onChange={(e) => {
                            setGender(e.target.value);
                            setErrMsg('');
                        }}
                    >
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
                            setErrMsg('');
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tpNumber">Telephone Number:</label>
                    <input type="text" id="tpNumber" name="tpNumber" required
                        onChange={(e) => {
                            setTpNumber(e.target.value);
                            setErrMsg('');
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="service">Service:</label>
                    <select id="service" name="service" value={service} required
                        onChange={(e) => {
                            setService(e.target.value);
                            setSelectedService(e.target.value);
                            setErrMsg('');
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

                <div className="form-group">
                    <label>Price:</label>
                    <span>{formatPrice(price)}</span>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
