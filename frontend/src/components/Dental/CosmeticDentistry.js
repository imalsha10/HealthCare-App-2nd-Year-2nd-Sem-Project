import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const CosmeticDentistry = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Enhance Your Smile with Cosmetic Dentistry</h1>
      <p style={styles.introduction}>Welcome to Ratnam Dental's Cosmetic Dentistry services, where we specialize in enhancing the appearance of your smile. Our team of skilled professionals is dedicated to helping you achieve the beautiful, confident smile you deserve.</p>
      <div style={styles.services}>
        <h2>Services Offered:</h2>
        <ul>
          <li>Teeth Whitening: Brighten your smile and remove stains with our professional teeth whitening treatments.</li>
          <li>Dental Veneers: Correct imperfections such as chips, cracks, or gaps with custom-made dental veneers.</li>
          <li>Orthodontics: Straighten misaligned teeth and correct bite issues with traditional braces or clear aligners.</li>
          <li>Cosmetic Bonding: Repair minor imperfections like chips or discoloration with composite resin bonding.</li>
        </ul>
      </div>
      <div style={styles.benefits}>
        <h2>Benefits:</h2>
        <ul>
          <li>Improved Confidence: Feel more confident in your smile with our tailored cosmetic treatments.</li>
          <li>Enhanced Appearance: Achieve a more youthful and attractive appearance with cosmetic dentistry.</li>
          <li>Personalized Care: Receive personalized treatment plans designed to address your unique needs and goals.</li>
        </ul>
      </div>
      <div style={styles.contact}>
        <p>Ready to transform your smile? to schedule a consultation with our cosmetic dentistry team today.</p>
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

export default CosmeticDentistry;
