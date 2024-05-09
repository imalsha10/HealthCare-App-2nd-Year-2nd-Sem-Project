import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./css/TimeSlots.css";

function TimeSlots() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patients, setPatients] = useState([]);
  const [currentHour, setCurrentHour] = useState('');
  const [today, setToday] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    function getPatients() {
      axios.get("http://localhost:8070/patients")
        .then((res) => {
          setPatients(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error("Error fetching patients:", err);
        });
    }

    getPatients();  
  }, []);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    setCurrentHour(hour);
    setToday(getISODate(now)); // Using utility function to get ISO date
  }, []);

  const getISODate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleSlotClick = (slot) => {
    if (selectedSlot === slot) {
      setSelectedSlot(null);
      return;
    }
    setSelectedSlot(slot);
    navigate('/dental/dentalAdd', { state: { selectedSlot: slot } });
  };

  const isSlotDisabled = (slot) => {
    const now = new Date();
    const slotBeginTime = parseInt(slot.split(':')[0], 10); 

    if (currentHour >= 19 && currentHour <= 24) {
      const nextDay = new Date(now);
      nextDay.setDate(now.getDate() + 1);
      setToday(getISODate(nextDay)); 
    } 

    return patients.some(patient => patient.time === slot && patient.date?.split('T')[0] === today) || (currentHour >= slotBeginTime);
  };
  
  const timeSlots = [
    '09:00 AM - 09:45 AM',
    '10:00 AM - 10:45 AM',
    '11:00 AM - 11:45 AM',
    '12:00 PM - 12:45 PM',
    '13:00 PM - 13:45 PM',
    '14:00 PM - 14:45 PM',
    '15:00 PM - 15:45 PM',
    '16:00 PM - 16:45 PM',
    '17:00 PM - 17:45 PM',
    '18:00 PM - 18:45 PM'
  ];

  return (
    <div className="time-slot-container">
      <h2 className="time-slot-heading">Select the Time Slot You Can Afford Easily</h2>
      <h3 className="time-slot-note">Note : After you submitted the form, the Time Slot can't be change or update. Therefore select the Time Slot carefully !</h3>
      <div className="time-slot-list">
        {timeSlots.map((slot, index) => (
          <button
            key={slot}
            className={`time-slot-item ${selectedSlot === slot ? 'selected' : ''}`}
            onClick={() => handleSlotClick(slot)}
            disabled={isSlotDisabled(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TimeSlots;
