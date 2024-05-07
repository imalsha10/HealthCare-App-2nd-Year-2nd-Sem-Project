import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { saveAs } from 'file-saver';
import "../../css/view.css";
import jsPDF from 'jspdf';
import "jspdf-autotable";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Inquiry() {
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get("http://localhost:8070/inquiry/");
      setInquiries(response.data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      alert("An error occurred while fetching inquiries. Please try again later.");
    }
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8070/inquiry/view/${id}`);
      setSelectedInquiry(response.data);
      setShowModal(true); // Open the modal
    } catch (error) {
      console.error("Error fetching inquiry details:", error);
      alert("An error occurred while fetching inquiry details. Please try again later.");
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleReplyChange = (e) => {
    setReplyMessage(e.target.value);
  };



  const handleReplySubmit = async (id, msg) => {

    // console.log(msg);
    if (!msg) {
      console.error("Please enter your email content");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8070/inquiry/send-email', {
        id,
        msg,
      });
      console.log('Email sent successfully:', response.data);
      // alert('Email sent successfully!');
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Email sent successfully!',
      });
    } catch (error) {
      console.error('Error sending email:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while sending the email. Please try again later.',
      });
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Invalid or missing inquiry ID for delete.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        const response = await axios.delete(`http://localhost:8070/inquiry/delete/${id}`);
        if (response.data.status === "Inquiry deleted") {
          alert("Inquiry deleted successfully!");
          setInquiries(prevInquiries => prevInquiries.filter(inquiry => inquiry._id !== id));
        } else {
          alert("Failed to delete inquiry. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting inquiry:", error);
        alert("An error occurred while deleting the inquiry. Please try again later.");
      }
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(18);
    doc.text("Inquiries Report", 14, 15);

    // Add table headers
    const headers = ["ID", "Name", "Email", "Phone", "Type", "Message", "Reply Message"];
    const data = [];
    const tableHeaders = headers.map((header, index) => {
      return { title: header, dataKey: index.toString() };
    });

    // Prepare table data
    inquiries.forEach((inquiry, index) => {
      data.push([inquiry._id, inquiry.name, inquiry.email, inquiry.phone, inquiry.type, inquiry.message, inquiry.replyMessage || "No Reply"]);
    });

    // Set table format
    doc.autoTable({
      startY: 25,
      head: [tableHeaders],
      body: data
    });

    // Save the PDF
    doc.save("inquiries_report.pdf");
  };


  const filteredInquiries = inquiries.filter((inquiry) => {
    const searchTerms = searchQuery.toLowerCase().split(" ");
    return searchTerms.every((term) =>
      Object.values(inquiry).some(
        (value) => value && value.toString().toLowerCase().includes(term)
      )
    );
  });

  return (
    <div className="main-container">
      <div className="body-container clearfix">
        <div className="order-section-one-container">
          <div className="order-section-one-left">
            <h3 className="consultantcare-heading">All Inquiries</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search inquiries..."
            />
          </div><br></br>
          <button className="button generate-report" onClick={generateReport}>Generate Report</button>
        </div><br></br>
        <div className="table-container">
          <table className="table">
            <thead id="app-table">
              <tr className="table-primary">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Type</th>
                <th>Message</th>
                <th>Reply Message</th> {/* New column for the reply message */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry._id}>
                  <td>{inquiry._id}</td>
                  <td>{inquiry.name}</td>
                  <td>{inquiry.email}</td>
                  <td>{inquiry.phone}</td>
                  <td>{inquiry.type}</td>
                  <td>{inquiry.message}</td>
                  <td>{inquiry.replyMessage}</td> {/* Display the reply message */}
                  <td>
                    <div className="button-container">
                      <button className="button view" onClick={() => handleView(inquiry._id)}>View</button>
                      <button className="button delete" onClick={() => handleDelete(inquiry._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div id="overlay" className="overlay">
          <div id="modalContent" className="modal-content">
            <div id="modalContent" className="modal-content">
              <div className="form-group">
                <label htmlFor="inputId"></label>
                <input type="text" className="form-control" id="inputId" value={selectedInquiry?._id || ""} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="inputName"></label>
                <input type="text" className="form-control" id="inputName" value={selectedInquiry?.name || ""} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail"></label>
                <input type="email" className="form-control" id="inputEmail" value={selectedInquiry?.email || ""} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="inputPhone"></label>
                <input type="text" className="form-control" id="inputPhone" value={selectedInquiry?.phone || ""} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="inputType"></label>
                <input type="text" className="form-control" id="inputType" value={selectedInquiry?.type || ""} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="inputMessage"></label>
                <textarea className="form-control" id="inputMessage" value={selectedInquiry?.message || ""} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="inputReply"></label>
                <textarea className="form-control" id="inputReply" placeholder="Reply Message" />
              </div>
              <div>
              <button className="btn btn-primary" onClick={() => handleReplySubmit(selectedInquiry,document.getElementById('inputReply').value)}>Submit Reply</button>
              </div>
            </div>
            <div>
              <button className="btn btn-primary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
