import React from 'react';

const StatusCard = ({ title, count, color, icon , iconAndTextColor}) => {
  return (
    <div style={{ ...cardStyle, backgroundColor: color }}>
      <center>
        <div style={{color: iconAndTextColor}}>{icon}</div>
      </center>
      <div style={contentStyle}>
        <h4 style={{...titleStyle, color: iconAndTextColor}}>{title} : &nbsp;</h4>
        <p style={{...countStyle, color: iconAndTextColor}}> {count}</p>
      </div>
    </div>
  );
};

const cardStyle = {
  width: '180px',
  alignItems: 'start',
  borderRadius: '10px',
  padding: '15px',
  color: '#fff',
  fontFamily: 'Trirong',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  transition: 'background-color 0.5s ease'
};

const contentStyle = {
  display: 'flex',
  justifyContent: 'center'
};

const titleStyle = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 'bold',
  color: 'black'
};

const countStyle = {
  margin: 0,
  fontSize: '20px',
  fontWeight: 'bold',
  color: 'black'
};

export default StatusCard;
