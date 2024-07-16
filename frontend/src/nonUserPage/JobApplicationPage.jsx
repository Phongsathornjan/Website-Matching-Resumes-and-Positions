import React from 'react';
import Navbar from '../components/navbar/Navbar.jsx';
import JobApplicationList from '../components/JobApplicationForm.jsx'

const JobApplicationPage = () => {

  return (
    <>
      <Navbar></Navbar>
      <div style={{marginTop: '100px'}}>
      <JobApplicationList></JobApplicationList>
      </div>
    </>
  );
};

export default JobApplicationPage;
