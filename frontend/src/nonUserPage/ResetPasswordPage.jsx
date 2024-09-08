import React, { useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar.jsx';
import Bottombar from '../components/navbar/Bottombar.jsx';


const ResetPasswordPage = () => {
  const navigate = useNavigate();

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

  const onButtonClick = () => {
    // สร้าง otp ส่งผ่านเมลและเก็บไว้ใน local storage 
    // ส่ง otp
    navigate('/VerifyEmailPage');
  }

  return (
    <>
    <Navbar></Navbar>
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.header}>
          <h2>Resume Union</h2>
        </div>
        <h5 style={styles.ResetText}>RESET YOU PASSWORD</h5>
        <p style={styles.Text}> Enter your user account's verified email address <br />and we will send you a password reset link to email.</p>
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="email"
              placeholder="Email"
              style={styles.input}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Link to={'#'}>
          <button type="submit" style={styles.button} onClick={onButtonClick}>Send</button>
          </Link>
        </form>
      </div>
    </div>
    <Bottombar></Bottombar>
    </>
  );
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
