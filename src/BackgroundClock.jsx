
import React, { useState, useEffect } from 'react';
import './BackgroundClock.css';

function BackgroundClock() {
  const [time, setTime] = useState(new Date());
  const [targetDate, setTargetDate] = useState(() => {
    const storedDate = localStorage.getItem('targetDate');
    return storedDate ? new Date(storedDate) : null;
  });
  const [isEditingTargetDate, setIsEditingTargetDate] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const calculateDaysLeft = () => {
    if (!targetDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setTargetDate(newDate);
    localStorage.setItem('targetDate', newDate.toISOString());
    setIsEditingTargetDate(false);
  };

  const formattedDate = time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const daysLeft = calculateDaysLeft();

  return (
    <div className="background-clock">
      {daysLeft !== null && (
        <div className="days-left">
          {isEditingTargetDate ? (
            <input 
              type="date" 
              value={targetDate ? targetDate.toISOString().split('T')[0] : ''}
              onChange={handleDateChange}
            />
          ) : (
            <>
              {daysLeft} days left
              <button onClick={() => setIsEditingTargetDate(true)} className="edit-button">Edit</button>
            </>
          )}
        </div>
      )}
      <div className="clock-date">{formattedDate}</div>
      <div className="clock-time">{formattedTime}</div>
    </div>
  );
}

export default BackgroundClock;
