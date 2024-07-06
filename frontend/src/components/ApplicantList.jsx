import React, { useEffect } from 'react';

const applicants = [
  { id: 1, post: 'Programmer 1' },
  { id: 2, post: 'Programmer 2' },
  { id: 3, post: 'Programmer 3' },
  { id: 4, post: 'Programmer 4' },
  { id: 5, post: 'Programmer 5' },
];

const ApplicantList = () => {

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyle;
    document.head.appendChild(styleSheet);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={listStyle}>
      {applicants.map((applicant) => (
        <div key={applicant.id} style={itemStyle}>
          <div>
            <p>คนที่ {applicant.id} จากโพสต์ {applicant.post}</p>
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
  margin: '40px'
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
  animation: 'fadeInFromBottom 1s ease-in',
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

const globalStyle = `
@keyframes fadeInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(20px); /* เริ่มต้นจากด้านล่าง */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* เลื่อนกลับไปที่ตำแหน่งเดิม */
  }
}

`;

export default ApplicantList;
