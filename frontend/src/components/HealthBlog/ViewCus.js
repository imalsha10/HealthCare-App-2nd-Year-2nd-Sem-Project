import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ViewCus(){
    const [viewdetails, setViewdetails] = useState([]);

    useEffect(() => {
        function getviewdetails() {
          axios
            .get("http://localhost:8070/eventform/cus")
            .then((res) => {
              setViewdetails(res.data);
            })
            .catch((err) => {
              alert(err.message);
            });
        }
        getviewdetails();
      }, []);

      const handleDeleteCustomer = (id) => {
        axios
          .delete(`http://localhost:8070/eventform/deletecus/${id}`)
          .then((response) => {
            console.log("Participation details deleted successfully");
            setViewdetails(null);
             
          })
          .catch((error) => {
            console.error("Error deleting participation details:", error);
            alert(error.message);
          });
      };
     

    return(
        <div className="container">
        <header>
        <div className="topic">Health Blog</div>
        <nav>
          <Link to="/add">Create Blog or Event</Link>
          <Link to="/">Health Blog</Link>
        </nav>
      </header>
      
   
      <table className="table table-striped">
        <thead>
          <tr>
            
            <th>Fullname</th>
            <th>Age</th>
            <th>phonenumber</th>
            <th>Email</th>
            <th>EventId</th>
            
          </tr>
        </thead>
        <tbody>
          {viewdetails.map((viewdetailcus) => (
            <tr key={viewdetailcus.id}>
              <td>{viewdetailcus.fullname}</td>
              <td>{viewdetailcus.age}</td>
              <td>{viewdetailcus.phonenumber}</td>
              <td>{viewdetailcus.email}</td>
              <td>{viewdetailcus.eventid}</td>
              <td>
                <button className="btn btn-danger" onClick={handleDeleteCustomer}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    );
}
