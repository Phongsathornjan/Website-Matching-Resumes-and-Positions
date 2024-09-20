import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AppointmentsPage() {
  const [date, setDate] = useState(new Date());

  const appointments = [
    { id: 1, title: "คนที่ 1", position: "ตำแหน่ง .....", date: "22 / 09 / 2567", type: "meeting", isNew: true },
    { id: 2, title: "คนที่ 2", position: "ตำแหน่ง .....", date: "22 / 09 / 2567", type: "meeting", isNew: true },
    { id: 3, title: "คนที่ 3", position: "ตำแหน่ง .....", date: "22 / 09 / 2567", type: "onsite", isNew: false },
    { id: 4, title: "คนที่ 4", position: "ตำแหน่ง .....", date: "22 / 09 / 2567", type: "onsite", isNew: false },
    { id: 5, title: "คนที่ 5", position: "ตำแหน่ง .....", date: "22 / 09 / 2567", type: "onsite", isNew: false },
  ];

  return (
    <div className="appointments-page">
      <div className="calendar-section">
        <div className="calendar">
          <Calendar
            onChange={setDate}
            value={date}
          />
        </div>
      </div>
      <div style={{height: "20px"}}></div>
      <div className="appointment-list">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            {appointment.isNew && <div className="new-label">NEW!</div>}
            <div className="appointment-info">
              <p>{appointment.title}</p>
              <p>{appointment.position}</p>
              <p>วันที่สัมภาษณ์ {appointment.date}</p>
              <p>meeting : {appointment.type === 'meeting' ? '.....' : 'Onsite'}</p>
            </div>
            <div className="appointment-actions">
              <button className="resume-btn">Resume</button>
              <button className="appointment-btn">More appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppointmentsPage;

const styles = `
@keyframes fadeInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.appointments-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-right: 150px;
}

.calendar-section {
  margin-bottom: 20px;
}

.calendar {
  border: 1px solid ;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: Black;
}

.react-calendar {
  width: 100%;
  max-width: 750px;
  background-color: white;
  border-radius: 8px;
}

.react-calendar__tile--active {
  background-color: #2ecc71 !important; /* ปรับสีเขียวเมื่อเลือกวัน */
  color: white;
}

.react-calendar__month-view__weekdays__weekday react-calendar__month-view__weekdays__weekday--weekend{
  color: black;
}

.appointment-list {
  width: 100%;
  max-width: 1000px;
}

.appointment-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 20px;
  position: relative;
  animation: fadeInFromBottom 0.6s ease-in; /* เพิ่มอนิเมชั่นที่นี่ */
}

.new-label {
  position: absolute;
  top: -10px;
  left: -10px;
  background-color: red;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
}

.appointment-info {
  flex: 1;
  margin-right: 20px;
}

.appointment-actions {
  display: flex;
  flex-direction: column;
}

.resume-btn, .appointment-btn {
  padding: 10px 20px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.resume-btn {
  background-color: #3498db;
  color: white;
}

.appointment-btn {
  background-color: #2ecc71;
  color: white;
}

.pagination {
  margin-top: 20px;
}

.react-calendar__navigation__label__labelText react-calendar__navigation__label__labelText--from{
  background-color: #717171;
}
`;

// Add the CSS to document head for inline styling
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
