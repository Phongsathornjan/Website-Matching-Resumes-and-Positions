import React, { useEffect } from 'react';
import Navbar from '../components/navbar/Navbar.jsx';
import Bottombar from '../components/navbar/Bottombar.jsx';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const SignInPage = () => {

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
      <div style={SignInStyle}>
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
          <Link to={'#'}>
          <button type="submit" style={buttonStyle}>Sign In</button>
          </Link>
        </form>
      </div>
      <div style={{height: '114px'}}></div>
      <Bottombar></Bottombar>
    </>
  );
};

const SignInStyle = {
  margin: '40px', 
  width: '1000px' ,
  animation: 'fadeInFromBottom 1s ease-in',
}

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

export default SignInPage;
