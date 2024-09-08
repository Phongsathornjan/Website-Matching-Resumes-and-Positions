import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar.jsx';
import Bottombar from '../components/navbar/Bottombar.jsx';
import Select from 'react-select';
import axios from 'axios';
import LocationOptions from '../components/LocationOptions.jsx';
import { Link, useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Bangkok');
  const [error, setError] = useState('');

  const submit = async () => {
    try{
      const response = await axios.post('http://localhost:4001/register',{
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        location: location,
      })
      if(response.status == 200){
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('id_user',response.data.id);
        navigate('/SignIn');
      }


    }catch(err){
      if(err.response.status == 400){
        setError(err.response.data.message);
      }
    }
  }

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
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form style={formStyle}>
            <div style={formRowStyle}>
                <input type="text" placeholder="Firstname" style={inputStyle} onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" placeholder="Lastname" style={inputStyle}  onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <input type="email" placeholder="Email" style={fullWidthInputStyle} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" style={fullWidthInputStyle} onChange={(e) => setPassword(e.target.value)}/>
            <Select
                options={LocationOptions}
                defaultValue={LocationOptions[0]} 
                placeholder="Select Location"
                styles={{ width: '100%' }}
                onChange={(e) => setLocation(e.value)}
            />
            <center>
            <Link to={'#'}>
            <button type="submit" style={buttonStyle} onClick={submit}>Register</button>
            </Link>
            </center>
        </form>
      </div>
      <div style={{height: '30px'}}></div>
    <Bottombar></Bottombar>
    </>
  );
};

const SignUpStyle = {
  margin: '40px',
  marginTop: '100px',
  width: '1440px',
  animation: 'fadeInFromBottom 0.5s ease-in',
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
