import React from 'react';
import FormField from './FormField';
import Navbar from './Navbar.jsx';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

<Navbar></Navbar>
const SendEmailForm = () => {
  return (
    <div style={{ margin: '40px' }}>
      <h1 style={titleStyle}>Send Email</h1>
      <form style={formStyle}>
        <div style={formRowStyle}>
          <FormField label="Subject : " type="text" placeholder="Enter the subject" />
          <FormField label="Meeting Link : " type="text" placeholder="Enter the meeting link" />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Text : </label>
          <textarea placeholder="Enter a text" style={textareaStyle}></textarea>
        </div>
        <button type="submit" style={buttonStyle}>Send</button>
      </form>
      <div style={contactHeadStyle}>
        <p>Contact for Information:</p>
        <div style={contactInfoStyle}>
          <p>Phongsathornjamjamsai@gmail.com</p>
          <p>Passakornvanachana@gmail.com</p>
          <div style={socialLinksStyle}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
            </a>
            </div>
        </div>
      </div>
    </div>
  );
};

const titleStyle = {
  color: '#3769B4',
  fontFamily: 'Trirong',
  fontSize: '48px', // Adjusted to match the image size
  fontWeight: 'bold',
  marginBottom: '30px',
};

const formStyle = {
  display: 'grid',
  gap: '20px',
};

const formRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#333',
  fontSize: '16px',
  fontFamily: 'Trirong',
};

const textareaStyle = {
  width: '100%',
  height: '150px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontFamily: 'Trirong',
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#3769B4',
  color: 'white',
  border: 'none',
  fontFamily: 'Trirong',
  cursor: 'pointer',
};

const contactHeadStyle = {
  marginTop: '20px',
  fontFamily: 'Trirong',
  fontSize: '22px',
};

const contactInfoStyle = {
  marginTop: '5px',
  fontFamily: 'Trirong',
  fontSize: '16px',
  color: 'gray',
};

const socialLinksStyle = {
  display: 'flex',
  gap: '25px', 
  marginTop: '15px',
};

export default SendEmailForm;
