import React, { useState } from "react";
import LOGO from "../../../assets/logo.png";
import LaboratoryComponent from "./LaboratoryComponent";
import { FaEnvelope } from "react-icons/fa";
import { useAuthStore } from "../../../store/useAuthStore";
import { USER_ROLES } from "../../../constants/roles";
import { Link } from "react-router-dom";

// Assuming you have other components for each service
// import OnlinePharmacyComponent from "./OnlinePharmacyComponent";
// import PrescribedMedComponent from "./PrescribedMedComponent";
// import DentalComponent from "./DentalComponent";
// import ConsultantCareComponent from "./ConsultantCareComponent";
// import HealthBlogComponent from "./HealthBlogComponent";
// import HealthCareComponent from "./HealthCareComponent";
// import InquiriesComponent from "./InquiriesComponent";

const Index = () => {
  const { logout, user } = useAuthStore((state) => ({
    logout: state.logout,
    user: state.user,
  }));

  const [selectedService, setSelectedService] = useState("Laboratory");

  const getServiceComponent = () => {
    switch (selectedService) {
      case "Online Pharmacy":
        return <h1>Online Pharmacy</h1>;
      case "Prescribed-Med":
        return <h1>Prescribed-Med</h1>;
      case "Dental":
        return <h1>Dental</h1>;
      case "Consultant Care":
        return <h1>Consultant Care</h1>;
      case "Health - Blog":
        return <h1>Health - Blog</h1>;
      case "Laboratory":
        return <LaboratoryComponent />;
      case "Health Care":
        return <h1>Health Care</h1>;
      case "Inquiries":
        return <h1>Inquiries</h1>;
      default:
        return null;
    }
  };

  // Helper function to determine the style for each list item
  const listItemStyle = (service) => ({
    fontWeight: selectedService === service ? "bold" : "normal",
    textDecoration: "underline",
    cursor: "pointer", // Adds a pointer cursor on hover
  });

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center p-3">
          <div className="d-flex justify-content-start align-items-center">
            {/* logo */}
            <img
              src={LOGO}
              alt="logo"
              style={{ width: "100px", height: "100px" }}
              className="mx-5"
            />

            {/* Hospital Name */}
            <h1 className="text-center">Ratnam Hospital</h1>
          </div>

          <div>
            {user && (
              <>
                <ul className="d-flex list-unstyled">
                  <li className="nav-item mx-3">
                    <img
                      src={`https://api.dicebear.com/8.x/micah/svg?seed=${user?.name}&flip=true&backgroundType=gradientLinear&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`}
                      alt="User Avatar"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: "2px solid #fff",
                      }}
                    />{" "}
                  </li>

                  {(user.role === USER_ROLES.LAB_ASSISTANT ||
                    user.role === USER_ROLES.PATIENT) && (
                    <li className="nav-item mx-2 align-self-center">
                      <a
                        className="btn btn-primary"
                        href={
                          user.role === USER_ROLES.LAB_ASSISTANT
                            ? "/lab-assistant"
                            : "/patient"
                        }
                      >
                        Dashboard
                      </a>
                    </li>
                  )}

                  <li className="nav-item mx-2 align-self-center">
                    <button
                      // white border
                      className="btn btn-danger"
                      onClick={() => {
                        logout();
                        window.location.href = "/login";
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </>
            )}

            {/* if user is not logged in */}
            {!user && (
              <>
                <Link to="/login" className="btn btn-primary mx-2">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <div style={{ backgroundColor: "#87ccf5" }}>
          {/* List of links */}
          <ul
            style={{
              display: "flex",
              justifyContent: "space-around",
              listStyle: "none",
              textDecoration: "underline",
            }}
            className="p-2"
          >
            <li
              style={listItemStyle("Online Pharmacy")}
              onClick={() => setSelectedService("Online Pharmacy")}
            >
              Online Pharmacy
            </li>
            <li
              style={listItemStyle("Prescribed-Med")}
              onClick={() => setSelectedService("Prescribed-Med")}
            >
              Prescribed-Med
            </li>
            <li
              style={listItemStyle("Dental")}
              onClick={() => setSelectedService("Dental")}
            >
              Dental
            </li>
            <li
              style={listItemStyle("Consultant Care")}
              onClick={() => setSelectedService("Consultant Care")}
            >
              Consultant Care
            </li>
            <li
              style={listItemStyle("Health - Blog")}
              onClick={() => setSelectedService("Health - Blog")}
            >
              Health - Blog
            </li>
            <li
              style={listItemStyle("Laboratory")}
              onClick={() => setSelectedService("Laboratory")}
            >
              Laboratory
            </li>
            <li
              style={listItemStyle("Health Care")}
              onClick={() => setSelectedService("Health Care")}
            >
              Health Care
            </li>
            <li
              style={listItemStyle("Inquiries")}
              onClick={() => setSelectedService("Inquiries")}
            >
              Inquiries
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content based on selection */}
      {getServiceComponent()}

      {/* Footer */}
      <div
        className="d-flex justify-content-around align-items-center p-3 text-white"
        style={{ backgroundColor: "#87ccf5" }}
      >
        <div>
          <h2 style={{ fontWeight: "bold" }}>
            Join our newsletter to stay up to date
          </h2>
          <h6>Staty connected with Ratnam Hospital</h6>
        </div>
        <div className="d-flex justify-content-around align-items-center gap-3">
          {/* make it fully rounded */}
          <div className="d-flex justify-content-around align-items-center gap-3 bg-white p-2 rounded">
            <FaEnvelope size={25} color="#87ccf5" />
            <input
              type="email"
              placeholder="Enter your email"
              className="border-0"
            />
          </div>
          <button className="btn btn-dark">Subscribe</button>
        </div>
      </div>
    </>
  );
};

export default Index;
