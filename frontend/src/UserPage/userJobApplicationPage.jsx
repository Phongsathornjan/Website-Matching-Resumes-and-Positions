import React from 'react';
import Navbar from '../components/navbar/UserNavbar.jsx';
import UserJobApplicationList from '../components/userComponents/userJobApplicationForm.jsx'

const userJobApplicationPage = () => {

  return (
    <>
      <Navbar></Navbar>
      <div style={{marginTop: '100px'}}>
      <UserJobApplicationList></UserJobApplicationList>
      </div>
    </>
  );
};

export default userJobApplicationPage;
