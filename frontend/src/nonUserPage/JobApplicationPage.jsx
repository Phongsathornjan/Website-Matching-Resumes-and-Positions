import React from 'react';
import Navbar from '../components/navbar/Navbar.jsx';
import JobApplicationList from '../components/JobApplicationForm.jsx'

const JobApplicationPage = () => {

  return (
    <>
      <Navbar></Navbar>
      <JobApplicationList></JobApplicationList>
    </>
  );
};

export default JobApplicationPage;
