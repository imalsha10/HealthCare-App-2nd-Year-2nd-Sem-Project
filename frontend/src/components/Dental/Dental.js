import React from "react";
import "./css/Dental.css";

export default function Dental(){

    return(
        <div className="dental-container">
            <h3 className="heading">Ratnam Dental</h3>
            <div className="dental-image">
                <img src="https://caredentaltysons.com/wp-content/uploads/2024/01/Restorative-1.png" alt="Dental Image" />  
                <p>We only use quality products to treat our customers. so don't worry about anything. we will take care of your Smile.</p>
            </div>
            <div className="details-container">
                <div className="dental-services">
                    <div className="service-box">
                        <h2>Cosmetic Dentistry</h2>
                        <p>Cosmetic dentistry is the branch of dentistry that focuses on improving the appearance of your smile</p>
                        <a href="/dental/cosmeticDentistry">Learn More</a>
                    </div>
                    <div className="service-box">
                        <h2>Dental Implants</h2>
                        <p>A dental implant is an artificial tooth root that's placed into your jaw to hold a prosthetic tooth or bridge.</p>
                        <a href="/dental/dentalImplants">Learn More</a>
                    </div>
                        <div className="service-box">
                        <h2>Root Canal Treatment</h2>
                        <p>Root canal treatment (endodontics) is a dental procedure used to treat infection at the centre of a tooth.</p>
                        <a href="/dental/rootCanalTreatment">Learn More</a>
                    </div>
                </div>  
                <div>
                    <div className="dental-info">
                        <a href="/dental/dentalTimes">Book Now Your Appointment</a>
                    </div>
                </div> 
            </div>
        </div>
    )
}