import React from 'react';

const FormField = ({ label, type, placeholder, onChange }) => {
  return (
    <form style={formFieldStyle}>
      <label style={labelStyle}>{label}</label>
      <input type={type} placeholder={placeholder} style={inputStyle} onChange={onChange}/>
    </form>
  );
};

const formFieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#333',
  fontSize: '16px',
  fontFamily: 'Trirong',
};

const inputStyle = {
  padding: '12px',
  fontSize: '16px',
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '5px',
};


export default FormField;
