import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/navbar/Navbar.jsx';
import Bottombar from '../components/navbar/Bottombar.jsx';

const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

  const submit = async () => {
    try{
      const response = await axios.post('http://localhost:4001/login',{
        email,
        password,
      });

      if(response.status == 200){
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('id_user',response.data.id);
        navigate('/UserIndexPage');
      }

    }catch(err){
      if(err.response.status == 400){
        setError(err.response.data.message);
      }
    }
  }
   
  return (
    <>
      <Navbar></Navbar>
      <div style={SignInStyle}>
        <h1 style={titleStyle}>Sign In</h1>
        <p style={subheadingStyle}>Welcome back ! Please sign in to your account.</p>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form style={formStyle}>
          <div style={inputGroupStyle}>
            <span style={iconStyle}>
              <FaEnvelope />
            </span>
            <input type="email" placeholder="Email" style={fullWidthInputStyle} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div style={inputGroupStyle}>
            <span style={iconStyle}>
              <FaLock />
            </span>
            <input type="password" placeholder="Password" style={fullWidthInputStyle} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Link to={'#'}>
          <button type="submit" style={buttonStyle} onClick={submit}>Sign In</button>
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
  marginTop: '100px',
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
