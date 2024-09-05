import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/navbar/Navbar.jsx';
import Bottombar from '../components/navbar/Bottombar.jsx';


const ResetPasswordPage = () => {

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
          <button type="submit" style={styles.button} onClick={submit}>Send</button>
          </Link>
        </form>
      </div>
    </div>
    <Bottombar></Bottombar>
    </>
  );
};

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
  },
  box: {
    backgroundColor: '#E5EFFF',
    padding: '30px',
    borderRadius: '10px',
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
