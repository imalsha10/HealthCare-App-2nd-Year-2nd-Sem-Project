import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const RootCanalTreatment = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Relieve Pain and Save Your Tooth with Root Canal Treatment</h1>
      <p style={styles.introduction}>Dealing with a toothache or dental infection? Root canal treatment, also known as endodontic therapy, could be the solution you need to alleviate pain and preserve your natural tooth. At Ratnam Dental, our experienced team is here to provide gentle and effective root canal treatment.</p>
      <div style={styles.procedure}>
        <h2>Procedure Overview:</h2>
        <ul>
          <li>Diagnosis: We'll carefully examine your tooth and dental X-rays to determine if root canal therapy is necessary.</li>
          <li>Treatment: Using advanced techniques, we'll remove the infected pulp from inside your tooth, clean the area, and seal it to prevent further infection.</li>
          <li>Restoration: After the root canal procedure, we may recommend a dental crown to restore strength and function to your treated tooth.</li>
        </ul>
      </div>
      <div style={styles.benefits}>
        <h2>Benefits:</h2>
        <ul>
          <li>Pain Relief: Root canal treatment can provide immediate relief from tooth pain caused by infection or inflammation.</li>
          <li>Tooth Preservation: Save your natural tooth from extraction and maintain the integrity of your smile.</li>
          <li>Prevent Further Damage: Root canal therapy can prevent the spread of infection and protect adjacent teeth from damage.</li>
        </ul>
      </div>
      <div style={styles.contact}>
        <p>Don't let tooth pain disrupt your life. To schedule an appointment with our endodontic specialists to discuss root canal treatment options today.</p>
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
  procedure: {
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

export default RootCanalTreatment;
