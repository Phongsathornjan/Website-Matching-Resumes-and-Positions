import React from 'react';

const appointments = [
  { id: 1, position: 'Programmer', date: '18 / 06 / 2567' },
  { id: 2, position: 'Data Engineer', date: '19 / 06 / 2567' },
  { id: 3, position: 'Data Analyst', date: '20 / 06 / 2567' },
  { id: 4, position: 'Data Scienctist', date: '21 / 06 / 2567' },
  { id: 5, position: 'Software Engineer', date: '22 / 06 / 2567' },
];

const AppointmentList = () => {
  return (
    <div style={listStyle}>
      {appointments.map((appointment) => (
        <div key={appointment.id} style={itemStyle}>
          <div>
            <p>คนที่ {appointment.id} ตำแหน่ง {appointment.position}</p>
            <p>วันที่สัมภาษณ์ {appointment.date}</p>
            <p>meeting :</p>
          </div>
          <div style={buttonContainerStyle}>
            <button style={resumeButtonStyle}>Resume</button>
            <button style={appointmentButtonStyle}>More appointment</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const listStyle = {
  marginTop: '20px',
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginBottom: '10px',
  fontFamily: 'Trirong',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '10px',
};

const resumeButtonStyle = {
  backgroundColor: '#3769B4',
  color: 'white',
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

const appointmentButtonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

export default AppointmentList;
