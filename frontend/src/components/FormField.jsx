import React from 'react';

const FormField = ({ label, type, placeholder }) => {
  return (
    <div style={formFieldStyle}>
      <label style={labelStyle}>{label}</label>
      <input type={type} placeholder={placeholder} style={inputStyle} />
    </div>
  );
};

const formFieldStyle = {
  marginBottom: '20px',
  width: 'calc(50% - 10px)',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#333',
  fontSize: '16px',
  fontFamily: 'Trirong',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontFamily: 'Trirong',
};

export default FormField;
