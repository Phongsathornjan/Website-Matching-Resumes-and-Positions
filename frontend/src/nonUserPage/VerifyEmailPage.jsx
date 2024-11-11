import React, {useEffect, useState} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar.jsx';
import axios from 'axios';

const VerifyEmailPage = () => {
    
  const navigate = useNavigate();
  const location = useLocation();

  const [status, setStatus] = useState(false);
  const [sign, setSign] = useState(null);
  const [isLoad, setIsLoad] = useState(null);

  const [email, setEmail] = useState(location.state?.email);
  const [newPassword, setNewPassword] = useState(null);
  const [otp, setOTP] = useState(location.state?.otp);
  const [inputOtp, setInputOtp] = useState(null);

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

  const onClickButton = () => {
    setIsLoad(true)
    console.log(otp)
    if(otp == inputOtp){
      setStatus(true)
      setSign(null)
      setIsLoad(false)
    }else{
      setSign("OTP ไม่ถูกต้อง")
      setIsLoad(false)
    }
  }

  const setPassword = async () => {
    //back end api
    const response = await axios.patch('http://localhost:4001/resetPassword',{
      email,
      newPassword
    });
    if(response.status == 200){
      navigate('/Signin');
    }
  }

  return (
    <>
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.header}>
          <h2>Resume Union</h2>
        </div>
        <h5 style={styles.VerifyText}>Verify Email</h5>
        <p style={styles.Text}> We will send you a OTP to email. Please Enter OTP.</p>
        {sign && <div className="alert alert-danger" role="alert">{sign}</div>}
        {isLoad && <center><div style={spinnerStyle}></div></center>}
        {status ? (
          <>
          <div className="alert alert-success" style={animation} role="alert">Success Please Enter new Password</div>
          <form style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <Link to={'#'}>
          <button type="submit" style={styles.button} onClick={setPassword} >Confirm</button>
          </Link>
        </form>
          </>        
        ) : (
          <>
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="int"
              placeholder="OTP"
              onChange={(e) => setInputOtp(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <Link to={'#'}>
          <button type="submit" style={styles.button} onClick={onClickButton} >Confirm</button>
          </Link>
        </form>
          </>
        )
        }
      </div>
    </div>
    </>
  );
};

const animation = {
  animation: 'fadeInFromBottom 0.5s ease-in',
}

const globalStyle = `
@keyframes fadeInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(10px); /* เริ่มต้นจากด้านล่าง */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* เลื่อนกลับไปที่ตำแหน่งเดิม */
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
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
    border: '1px solid #D9D9D9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  header: {
    color: '#4683d9',
    margin: 0,
  },
  VerifyText: {
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

const spinnerStyle = {
  border: '4px solid rgba(0, 0, 0, 0.1)',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  borderLeftColor: '#09f',
  animation: 'spin 1s ease infinite'
};

export default VerifyEmailPage;
