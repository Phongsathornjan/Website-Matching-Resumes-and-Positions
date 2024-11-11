import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";

import Navbar from '../components/navbar/Navbar.jsx';

const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {

    async function authentication() {
      try{
        let token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:4001/auth', {} ,{
          headers: {
            'x-access-token': token
          }
        })

        if(response.status == 200){
          if(response.data.userData.role == "member"){
            navigate('/UserIndexPage');
          }else if(response.data.userData.role == "hr"){
            navigate('/HrIndexPage');
          }else if(response.data.userData.role == "admin"){
            navigate('/AdminIndexPage');
          }
        }else{
          navigate('/SignIn');
        }

      } catch(err){
        navigate('/SignIn');
      }
    }
   
    authentication();

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyle;
    document.head.appendChild(styleSheet);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post('http://localhost:4001/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id_user', response.data.id);
        navigate('/UserIndexPage');
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        swal(
          "Oops!",
          `${err.response.data.message}`,
          "error"
        );
      } else {
        swal(
          "Oops!",
          "Something Error",
          "error"
        );
      }
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.box}>
          <div style={styles.header}>
            <h2>Resume Union</h2>
          </div>
          <h3 style={styles.signInText}>SIGN IN</h3>
          <p style={styles.welcomeText}>Welcome back! Please sign in to your account.</p>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <form style={styles.form} onSubmit={submit}> {/* Handle form submission here */}
            <div style={styles.formGroup}>
              <input
                type="email"
                placeholder="Email"
                style={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                value={email} // Set the value to the state
                required
              />
            </div>
            <div style={styles.formGroup}>
              <input
                type="password"
                placeholder="Password"
                style={styles.input}
                onChange={(e) => setPassword(e.target.value)}
                value={password} // Set the value to the state
                required
              />
            </div>
            <div style={styles.forgotPassword}>
            <Link to={'/ResetPasswordPage'}>
              <p style={styles.forgotPasswordLink}>Forget Password ?</p>
            </Link>

            </div>
            <button type="submit" style={styles.button}>Sign In</button>
          </form>
        </div>
      </div>
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
    border: '1px solid #D9D9D9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  header: {
    color: '#4683d9',
    margin: 0,
  },
  signInText: {
    marginTop: '10px',
    fontWeight: 'bold',
    color: '#333',
  },
  welcomeText: {
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
  forgotPassword: {
    marginBottom: '20px',
    textAlign: 'right',
  },
  forgotPasswordLink: {
    color: '#4683d9',
    textDecoration: 'none',
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
  },
};

export default SignInPage;
