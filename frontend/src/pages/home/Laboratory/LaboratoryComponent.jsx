import React from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import AddAppointmentModal from "../../appointment/AddAppointmentModal";
import { useAppointmentStore } from "../../../store/useAppointmentStore";
import { USER_ROLES } from "../../../constants/roles";
import img1 from "../../../assets/24_7.jpg";
import img2 from "../../../assets/modern_machines.png";
import img3 from "../../../assets/12-hours.png";

const LaboratoryComponent = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  //
  const { openAddAppointmentModal } = useAppointmentStore((state) => ({
    openAddAppointmentModal: state.openAddAppointmentModal,
  }));
  //
  const redirectToLogin = () => {
    window.location.href = "/login";
  };
  //
  return (
    <div className="container">
      {user && <AddAppointmentModal />}
      <h1 className="text-center" style={{ fontWeight: "bold" }}>
        Ratnam Laboratory
      </h1>

      {/* 3 cars in row */}
      <div className="d-flex justify-content-around gap-3 mt-4 mb-5">
        <div className="card">
          <div className="card-body text-center">
            <img
              src={img1}
              alt="Card Image"
              className="img-fluid mb-3"
              style={{ height: "100px" }}
            />
            <h5 className="card-title">Open 24/7</h5>
            <p className="card-text">
              We are open 24/7, so you can get your tests done whenever you need
              them.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <img
              src={img2}
              alt="Card Image"
              className="img-fluid mb-3"
              style={{ height: "100px" }}
            />
            <h5 className="card-title">Modern Machines</h5>
            <p className="card-text">
              Our lab is equipped with the latest and most modern lab machines
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <img
              src={img3}
              alt="Card Image"
              className="img-fluid mb-3"
              style={{ height: "100px" }}
            />
            <h5 className="card-title">Report in 12 Hours</h5>
            <p className="card-text">
              We will provide you with a test report in just 12 hours, so you
              can get the results you need quickly.
            </p>
          </div>
        </div>
      </div>

      {/* Book Now your service */}
      <div className="text-center mb-5">
        <button
          className="btn"
          style={{
            backgroundColor: "#87ccf5",
            color: "black",
            fontWeight: "bold",
          }}
          onClick={
            user?.role === USER_ROLES.PATIENT
              ? openAddAppointmentModal
              : redirectToLogin
          }
          disabled={user?.role === USER_ROLES.LAB_ASSISTANT ? true : false}
        >
          Book Now Your Service
        </button>
      </div>

      {/* transparent black background */}
      <div
        className="d-flex justify-content-around gap-3 text-white rounded mb-5 align-items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", fontWeight: "bold" }}
      >
        <div className="d-flex flex-column align-items-center">
          <h1>12000+</h1>
          <p>Test Performed</p>
        </div>
        {/* vertical line */}
        <div
          style={{
            borderLeft: "2px solid white",
            height: "100px",
          }}
        ></div>
        <div className="d-flex flex-column align-items-center">
          <h1>35+</h1>
          <p>Years of Experience</p>
        </div>
        {/* vertical line */}
        <div
          style={{
            borderLeft: "2px solid white",
            height: "100px",
          }}
        ></div>
        <div className="d-flex flex-column align-items-center">
          <h1>10+</h1>
          <p>Lab Assistants</p>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryComponent;
