// src/components/SignUpPage.jsx
import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Bottombar from './components/Bottombar.jsx';
import Select from 'react-select';
import LocationOptions from './components/LocationOptions.jsx';

const SignUpPage = () => {

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
    <>
    <Navbar></Navbar>
    <div style={SignUpStyle}>
        <h1 style={titleStyle}>Sign Up</h1>
        <p style={subheadingStyle}>Please fill in personal information.</p>
        <form style={formStyle}>
            <div style={formRowStyle}>
                <input type="text" placeholder="Firstname" style={inputStyle} />
                <input type="text" placeholder="Lastname" style={inputStyle} />
            </div>
            <input type="email" placeholder="Email" style={fullWidthInputStyle} />
            <input type="password" placeholder="Password" style={fullWidthInputStyle} />
            <Select
                options={LocationOptions}
                defaultValue={LocationOptions[0]} 
                placeholder="Select Location"
                styles={{ width: '100%' }} 
            />
            <button type="submit" style={buttonStyle}>Register</button>
        </form>
      </div>
      <div style={{height: '30px'}}></div>
    <Bottombar></Bottombar>
    </>
  );
};

const SignUpStyle = {
  margin: '40px', 
  width: '1000px',
  animation: 'fadeInFromBottom 1s ease-in',
}


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
  
  body {
    margin: 0;
    font-family: 'Trirong', sans-serif;
  }
  `;


export default SignUpPage;
