import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const DentalImplants = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Restore Your Smile with Dental Implants</h1>
      <p style={styles.introduction}>Missing teeth can have a significant impact on your confidence and oral health. At Ratnam Dental, we offer state-of-the-art dental implant solutions to restore your smile and improve your quality of life.</p>
      <div style={styles.services}>
        <h2>Services Offered:</h2>
        <ul>
          <li>Single Tooth Implants: Replace individual missing teeth with natural-looking dental implants.</li>
          <li>Implant-Supported Bridges: Restore multiple missing teeth with implant-supported dental bridges for increased stability and function.</li>
          <li>All-on-4 Implants: Replace an entire arch of missing teeth with just four strategically placed dental implants.</li>
          <li>Implant Restoration: Restore the function and aesthetics of existing dental implants with our restoration services.</li>
        </ul>
      </div>
      <div style={styles.benefits}>
        <h2>Benefits:</h2>
        <ul>
          <li>Improved Function: Enjoy restored chewing ability and speech with durable dental implants.</li>
          <li>Enhanced Appearance: Achieve a natural-looking smile that blends seamlessly with your remaining teeth.</li>
          <li>Long-Term Solution: Dental implants offer a permanent solution for tooth loss with proper care and maintenance.</li>
        </ul>
      </div>
      <div style={styles.contact}>
        <p>Ready to regain your smile? To schedule a consultation with our dental implant specialists to learn more about your options.</p>
        <Link to="/dental/dentalTimes" style={styles.button}>Book Now</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  introduction: {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  services: {
    marginBottom: '20px',
  },
  benefits: {
    marginBottom: '20px',
  },
  contact: {
    marginTop: '20px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
};

export default DentalImplants;
