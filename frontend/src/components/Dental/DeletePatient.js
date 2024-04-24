import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeletePatient() {
  const { patientId } = useParams();

  useEffect(() => {
    deletePatient();
  }, [patientId]);

  function deletePatient() {
    axios
      .delete(`http://localhost:8070/patients/delete/${patientId}`)
      .then(() => {
        alert("Patient Deleted !");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <h2>Delete Patient</h2>
    </div>
  );
}
