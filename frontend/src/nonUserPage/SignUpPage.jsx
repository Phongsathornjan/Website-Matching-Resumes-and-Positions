import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar.jsx';
import Bottombar from '../components/navbar/Bottombar.jsx';
import Select from 'react-select';
import axios from 'axios';
import LocationOptions from '../components/LocationOptions.jsx';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Bangkok');

  const verifyEmail = async () => {
    try{
        const response = await axios.post('http://localhost:4001/handleRegister',{
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        location: location,
      })
      const otp = getRandomOTP(1000,9999)
      showLoadingAlert()
      sendOTP(email, otp)
    }catch(err){
      console.log(err)
      if(err.response.status == 400){
        Swal.fire({
          icon: 'error',                   
          title: 'Oops2!',                 
          text: `${err.response.data.message}`,  
        });
      }
    }
  }

  function showLoadingAlert() {
    Swal.fire({
      title: 'Loading...',
      text: 'กำลังส่งรหัส OTP...',
      allowOutsideClick: false,      
      didOpen: () => {
        Swal.showLoading();          
      },
      showConfirmButton: false,      
    });
  }

  const sendOTP = async (email,otp) => {
    try{
    const response = await axios.post('http://localhost:4001/sendOTP', {
      email,
      otp,
    });
    if(response.status == 200){
      Swal.close();
      showOTPInputAlert(otp)
    }
    }catch(err){
      Swal.close();
      Swal.fire({
        icon: 'error',                   
        title: 'Oops!',                 
        text: `${err.response.data.message}`,  
      });
    }
  }

  function showOTPInputAlert(otp) {
    Swal.fire({
      title: 'ใส่รหัส OTP ของคุณ',
      input: 'text',                   
      inputPlaceholder: 'ใส่ OTP',    
      inputAttributes: {
        maxlength: 4,                  
        autocapitalize: 'off',        
        autocorrect: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Verify',
      cancelButtonText: 'Cancel',
      preConfirm: (otp) => {
        if (!/^\d{4}$/.test(otp)) {     
          Swal.showValidationMessage('Please enter a valid 4-digit OTP');
          return false;
        }
        return otp;              
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if(result.value != otp){
          Swal.fire({
            icon: 'error',                   
            title: 'Oops!',                 
            text: 'รหัส OTP ไม่ถูกต้อง',  
          });
        }else if(result.value == otp){
          submit()
        }
      }
    });
  }


  const getRandomOTP = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const submit = async () => {
    showLoadingRegister()
    try{
      const response = await axios.post('http://localhost:4001/register',{
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        location: location,
        role: 'member'
      })
      if(response.status == 200){
        Swal.close();
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('id_user',response.data._id);
        navigate('/SelectJobFieldPage');
      }


    }catch(err){
      Swal.close();
      if(err.response.status == 400){
        Swal.fire({
          icon: 'error',                   
          title: 'Oops!',                 
          text: `${err.response.data.message}`,  
        });
      }
    }
  }

  function showLoadingRegister() {
    Swal.fire({
      title: 'Loading...',
      text: 'กำลังสมัคร...',
      allowOutsideClick: false,      
      didOpen: () => {
        Swal.showLoading();          
      },
      showConfirmButton: false,      
    });
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
            <button type="submit" style={buttonStyle} onClick={verifyEmail}>Register</button>
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
