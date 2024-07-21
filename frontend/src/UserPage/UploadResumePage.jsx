import React from 'react'
import UserNavbar from '../components/navbar/UserNavbar'
import {Container, Row, Col } from 'react-bootstrap';
import Resume from '../components/userComponents/Resume';


function UploadResumePage() {
  return (
    <>
    <UserNavbar></UserNavbar>
    <div style={formStyle}>
    </div>
    <Resume></Resume>
    </>
  )
}

  const formStyle = {
    display: 'flex',
    margin: '40px',
    marginTop: '100px',
    justifyContent: 'center'
  };


export default UploadResumePage

