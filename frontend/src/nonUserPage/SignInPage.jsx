import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/navbar/Navbar.jsx';
import Bottombar from '../components/navbar/Bottombar.jsx';


const SignInPage = () => {

  return (
    <>
    <Navbar></Navbar>
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.header}>
          <h2>Resume Union</h2>
        </div>
        <h3 style={styles.signInText}>SIGN IN</h3>
        <p style={styles.welcomeText}>Welcome back! Please sign in to your account.</p>
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.forgotPassword}>
            <a href="#" style={styles.forgotPasswordLink}>Forget Password ?</a>
          </div>
          <button type="submit" style={styles.button}>Sign In</button>
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
  }
};


export default SignInPage;
