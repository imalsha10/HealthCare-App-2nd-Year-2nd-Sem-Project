import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function TimeSlots() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    navigate('/add')
  };

  return (
    <div className="time-slot-container">
      <h2 className="time-slot-heading">Select the Time Slot You Can Afford Easily</h2>
      <div className="time-slot-list">
        <button
          className={`time-slot-item ${selectedSlot === '09:00 AM - 09:45 AM' ? 'selected' : ''}`}
          onClick={() => handleSlotClick('09:00 AM - 09:45 AM')}
        >
          09:00 AM - 09:45 AM
        </button>
        <button
          className={`time-slot-item ${selectedSlot === '10:00 AM - 10:45 AM' ? 'selected' : ''}`}
          onClick={() => handleSlotClick('10:00 AM - 10:45 AM')}
        >
          10:00 AM - 10:45 AM
        </button>
        <button
          className={`time-slot-item ${selectedSlot === '11:00 AM - 11:45 AM' ? 'selected' : ''}`}
          onClick={() => handleSlotClick('11:00 AM - 11:45 AM')}
        >
          11:00 AM - 11:45 AM
        </button>
        <button
          className={`time-slot-item ${selectedSlot === '12:00 PM - 12:45 PM' ? 'selected' : ''}`}
          onClick={() => handleSlotClick('12:00 PM - 12:45 PM')}
        >
          12:00 PM - 12:45 PM
        </button>
        <button
          className={`time-slot-item ${selectedSlot === '01:00 PM - 01:45 PM' ? 'selected' : ''}`}
          onClick={() => handleSlotClick('01:00 PM - 01:45 PM')}
        >
          01:00 PM - 01:45 PM
        </button>
        <button
          className={`time-slot-item ${selectedSlot === '02:00 PM - 02:45 PM' ? 'selected' : ''}`}
          onClick={() => handleSlotClick('02:00 PM - 02:45 PM')}
        >
          02:00 PM - 02:45 PM
        </button>
        <button
          className={`time-slot-item ${selectedSlot === '03:00 PM - 03:45 PM' ? 'selected' : ''}`}
          onClick={() => handleSlotClick('03:00 PM - 03:45 PM')}
        >
          03:00 PM - 03:45 PM
        </button>
        <button
          className={`time-slot-item ${selectedSlot === '04:00 PM - 04:45 PM' ? 'selected' : ''}`}
          onClick={() => handleSlotClick('04:00 PM - 04:45 PM')}
        >
          04:00 PM - 04:45 PM
        </button>
        <button
          className={`time-slot-item ${selectedSlot === '05:00 PM - 05:45 PM' ? 'selected' : ''}`}
          onClick={() => handleSlotClick('05:00 PM - 05:45 PM')}
        >
          05:00 PM - 05:45 PM
        </button>
        <button
          className={`time-slot-item ${selectedSlot === '06:00 PM - 06:45 PM' ? 'selected' : ''}`}
          onClick={() => handleSlotClick('06:00 PM - 06:45 PM')}
        >
          06:00 PM - 06:45 PM
        </button>
      </div>
    </div>
  );
}

export default TimeSlots;
