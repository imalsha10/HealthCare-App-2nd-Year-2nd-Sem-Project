import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/AddService.css";

export default function AddPatient() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [nameError, setNameError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [priceError, setPriceError] = useState("");
    
    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();

        // Validation
        if (!name.trim()) {
            setNameError("Name is required");
            return;
        } else {
            setNameError("");
        }

        if (!description.trim()) {
            setDescriptionError("Description is required");
            return;
        } else {
            setDescriptionError("");
        }

        if (!price.trim()) {
            setPriceError("Price is required");
            return;
        } else {
            setPriceError("");
        }

        const newService = { name, description, price };

        axios.post("http://localhost:8070/services/add", newService)
            .then(() => {
                alert("Service Added !");
                navigate('/dental/dentalServices');
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className="container">
            <h2>Service Information Form</h2>
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    {nameError && <div className="error">{nameError}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        required
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    {descriptionError && <div className="error">{descriptionError}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        required
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                    />
                    {priceError && <div className="error">{priceError}</div>}
                </div>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
