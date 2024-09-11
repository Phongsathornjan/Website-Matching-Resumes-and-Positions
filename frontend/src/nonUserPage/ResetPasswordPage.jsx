import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/navbar/Navbar.jsx';

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState(null);
  const [error, setError] = useState(null);

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

  useEffect( () => {
    if(otp){
      sendOTP()
    }
  },[otp])

  const sendOTP = async () => {
    if(!email){
      setError('Please Enter your Email')
      return;
    }
    try{
    const response = await axios.post('http://localhost:4001/sendOTP', {
      email,
      otp,
    });
    if(response.status == 200){
      navigate('/VerifyEmailPage', { state: { otp: otp } });
    }
    }catch(err){
      console.log(err.response.data.message);
      setError(err.response.data.message)
    }
  }

  const onButtonClick = () => {
    const newOtp = getRandomOTP(1000,9999)
    setOtp(newOtp)
  }

  const getRandomOTP = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <>
    <Navbar></Navbar>
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.header}>
          <div style={{height: '25px'}}></div>
          <h2>Resume Union</h2>
        </div>
        <h5 style={styles.ResetText}>RESET YOU PASSWORD</h5>
        <div style={{height: '25px'}}></div>
        <p style={styles.Text}> Enter your user account's verified email address <br />and we will send you a password reset link to email.</p>
        {error ? (
          <><div className="alert alert-danger" style={alertStyle} role="alert">{error}</div></>
        ):(
          <><div style={{height: '58px'}}></div></>
        )}
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="email"
              placeholder="Email"
              style={styles.input}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Link to={'#'}>
          <button type="submit" style={styles.button} onClick={onButtonClick}>Send</button>
          </Link>
        </form>
      </div>
    </div>
    </>
  );
};

const alertStyle = {
  animation: 'fadeInFromBottom 0.5s ease-in',
}

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

const styles = {
  body: {
    margin: 0,
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
    animation: 'fadeInFromBottom 0.5s ease-in',
  },
  box: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    border: '1px solid #D9D9D9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  header: {
    color: '#4683d9',
    margin: 0,
  },
  ResetText: {
    marginTop: '10px',
    fontWeight: 'bold',
    color: '#333',
  },
  Text: {
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    backgroundColor: '#4683d9',
    color: 'white',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#3b74c3',
  }
};


export default ResetPasswordPage;
