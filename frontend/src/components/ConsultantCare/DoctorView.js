import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/doctorview.css"
import { Link } from "react-router-dom";

export default function DoctorView() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0); // State to keep track of current slide

  useEffect(() => {
    function getDoctors() {
      axios
        .get("http://localhost:8070/doctor/")
        .then((res) => {
          setDoctors(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getDoctors();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 4); // Adjust the number based on the number of slides
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  function searchDoctor(event) {
    setSearchQuery(event.target.value);
  }

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/doctor/delete/${id}`)
      .then((res) => {
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-container">
      <section className="container">
        <div className="image-container">
          <img
            src="https://bswh-p-001-delivery.sitecorecontenthub.cloud/api/public/content/6ddd84df68cb4fd7bd86a719cdf8c8ab?v=a682b4c0"
            height={400}
            width={600}
            alt=""
            style={{ display: currentSlide === 0 ? "block" : "none" }}
          />
          <img
            src="https://s3-eu-west-1.amazonaws.com/intercare-web-public/wysiwyg-uploads%2F1580196666465-doctor.jpg"
            height={400}
            width={600}
            alt=""
            style={{ display: currentSlide === 1 ? "block" : "none" }}
          />
          <img
            src="https://www.chesshealthsolutions.com/wp-content/uploads/2023/10/iStock-1473559425.jpg"
            height={400}
            width={600}
            alt=""
            style={{ display: currentSlide === 2 ? "block" : "none" }}
          />
          <img
            src="https://cdn-res.keymedia.com/cdn-cgi/image/f=auto/https://cdn-res.keymedia.com/cms/images/us/036/0248_637377494001299228.jpg"
            height={400}
            width={600}
            alt=""
            style={{ display: currentSlide === 3 ? "block" : "none" }}
          />
        </div>
        <div className="content">
          <h2>Find & Book Appointment With Your Favourite Doctors</h2>
          <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#666" }}>
            "Discovering the perfect healthcare provider just got easier with
            our platform,'Find & Book Appointment With Your Favorite Doctors.'
            Tailored to prioritize your needs, our user-friendly interface
            simplifies the process of locating and scheduling appointments with
            trusted medical professionals.Seamlessly search through an extensive
            database of doctors spanning various specialties, filtering results
            based on location, availability, and patient reviews. Each doctor
            profile provides detailed information to aid in your decision-making
            process, ensuring a personalized and informed experience."
          </p>
          
          <Link to="/consultant/addapp" className="button">
             Book Now
            </Link>
        </div>
      </section>

      <div className="navigation-auto">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className={`auto-btn${index}`}></div>
        ))}
      </div>

      <div className="navigation-manual">
        {[1, 2, 3, 4].map((index) => (
          <label
            key={index}
            htmlFor={`radio${index}`}
            className="manual-btn"
          ></label>
        ))}
      </div>
      <div>
  <h2>Types of Services</h2>
      <div className="container text-center">
        <div className="row justify-content-center cards-container">
          {" "}
          {/* Add custom class cards-container */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <div className="image-section">
                  <img
                    src="/doctor.png"
                    alt="doctor"
                    className="card-image"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <h3 className="card-title">Easy Doctor Search</h3>
                  <p className="card-description">
                    {" "}
                    Users can quickly search for doctors based on various
                    criteria such as specialty, location, availability, and
                    patient reviews. This platform aims to simplify the often
                    complex and time-consuming task of finding the right doctor
                    by providing a user-friendly interface and comprehensive
                    search options.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <div className="image-section">
                  <img
                    src="/personal.png"
                    alt="personal"
                    className="card-image"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <h3 className="card-title">Doctor Information</h3>

                  <p className="card-description">
                    Our doctor appointment page offers a range of services
                    tailored to meet your healthcare needs. Explore diverse
                    specialties, seamless booking. Access detailed doctor
                    information for informed decisions, ensuring personalized
                    care experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <div className="image-section">
                  <img
                    src="/appointment.png"
                    alt="appointment"
                    className="card-image"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <h3 className="card-title">Select Schedule</h3>

                  <p className="card-description">
                    Discover diverse services on our doctor appointment page.
                    Seamlessly schedule consultations, routine check-ups, or
                    specialized treatments. Easily select appointment times,
                    ensuring convenient access to personalized healthcare.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
      <div className="body-container clearfix">
        <div className="order-section-one-container">
          <div className="order-section-one-left">
            <h3 className="consultantcare-heading">AVAILABLE DOCTORS LIST</h3>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/addapp" className="appointment-link">
              Click here to make an appointment
            </Link>
          </div>
          <div className="order-section-one-right">
            <input
              type="search"
              placeholder="Search Name"
              className="search-box"
              value={searchQuery}
              onChange={searchDoctor}
            />
          </div>
        </div>

        <div className="doctors-list">
          {filteredDoctors.map((doctor) => (
            <div className="doctor-card" key={doctor._id}>
              <div className="image">
                <img
                  src={doctor.img}
                  alt="doctor"
                  className="img-fluid"
                  style={{
                    width: "280px",
                    height: "300px", // Set a fixed height
                    objectFit: "cover", // Ensure the image covers the area without stretching
                    borderRadius: "10px",
                  }}
                />
              </div>
              <p>
                <strong></strong> {doctor.id}
              </p>
              <p>
                <strong></strong> {doctor.name}
              </p>
              <p>
                <strong></strong> {doctor.specialty}
              </p>
              <p>
                <strong></strong> {doctor.description}
              </p>
              <button
                className="delete-button"
                onClick={() => handleDelete(doctor._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
