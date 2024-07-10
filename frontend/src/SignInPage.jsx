// src/components/SignUpPage.jsx
import React from 'react';
import Navbar from './components/Navbar.jsx';
import Bottombar from './components/Bottombar.jsx';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const SignInPage = () => {
   
  return (
    <>
      <Navbar></Navbar>
      <div style={{ margin: '40px' }}>
        <h1 style={titleStyle}>Sign In</h1>
        <p style={subheadingStyle}>Welcome back ! Please sign in to your account.</p>
        <form style={formStyle}>
          <div style={inputGroupStyle}>
            <span style={iconStyle}>
              <FaEnvelope />
            </span>
            <input type="email" placeholder="Email" style={fullWidthInputStyle} />
          </div>
          <div style={inputGroupStyle}>
            <span style={iconStyle}>
              <FaLock />
            </span>
            <input type="password" placeholder="Password" style={fullWidthInputStyle} />
          </div>
          <button type="submit" style={buttonStyle}>Sign In</button>
        </form>
      </div>
      <Bottombar></Bottombar>
    </>
  );
};

const inputGroupStyle = {
  display: 'flex', 
  margin: '10px',
};

const iconStyle = {
  margin: '10px', 
};

const subheadingStyle = {
    fontSize: '1.2rem',
    color: '#888888',
    marginBottom: '40px',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
};

const formRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

const inputStyle = {
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: 'calc(50% - 10px)', // Adjusting for padding and border
};

const buttonStyle = {
    padding: '10px',
    marginTop: '20px',
    backgroundColor: '#3769B4',
    color: 'white',
    border: 'none',
    fontFamily: 'Trirong',
    cursor: 'pointer',
  };

const fullWidthInputStyle = {
    ...inputStyle,
    width: '100%',
};

const titleStyle = {
    color: '#3769B4',
    fontFamily: 'Trirong',
    fontSize: '48px', // Adjusted to match the image size
    fontWeight: 'bold',
    marginBottom: '30px',
  };

export default SignInPage;
