import React from 'react';

const applicants = [
  { id: 1, post: 'Programmer 1'},
  { id: 2, post: 'Programmer 2'},
  { id: 3, post: 'Programmer 3'},
  { id: 4, post: 'Programmer 4'},
  { id: 5, post: 'Programmer 5'},
];

const ApplicantList = () => {
  return (
    <div style={listStyle}>
      {applicants.map((applicant) => (
        <div key={applicant.id} style={itemStyle}>
          <div>
            <p>คนที่ {applicant.id} จากโพส {applicant.post}</p>
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

export default ApplicantList;
