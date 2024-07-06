import React from 'react';

const StatusCard = ({ title, count, color, icon }) => {
  return (
    <div style={{ ...cardStyle, backgroundColor: color }}>
      <div style={iconStyle}>{icon}</div>
      <div style={contentStyle}>
        <h4 style={titleStyle}>{title}</h4>
        <p style={countStyle}>{count}</p>
      </div>
    </div>
  );
};

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '10px',
  padding: '15px',
  color: '#fff',
  fontFamily: 'Trirong',
};

const iconStyle = {
  fontSize: '24px',
  marginRight: '15px',
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle = {
  margin: 0,
  fontSize: '18px',
  fontWeight: 'normal',
};

const countStyle = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 'bold',
};

export default StatusCard;
