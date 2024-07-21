import React from 'react'
import UserNavbar from '../components/navbar/UserNavbar'
import RecommendList from '../components/userComponents/RecommendList';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RecommendJobPage() {
  return (
    <>
    <UserNavbar></UserNavbar>
    <div style={formStyle}>
    </div>
    <RecommendList></RecommendList>
    </>
  )
}

  const formStyle = {
    display: 'flex',
    margin: '40px',
    marginTop: '100px',
    justifyContent: 'center'
  };


export default RecommendJobPage

