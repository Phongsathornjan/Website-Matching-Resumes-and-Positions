import React, { useEffect } from 'react';
import HRNavbar from '../components/navbar/HRNavbar';
import StatusCard from '../components/StatusCard';
import InterviewList from '../components/InterviewList';
import { FaBriefcase, FaCalendarCheck, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HRInterviewPage = () => {
  const navigate = useNavigate();

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
          if(response.data.userData.role != "admin"){
            navigate('/SignIn');
          }
        }else{
          navigate('/SignIn');
        }

      } catch(err){
        navigate('/SignIn');
      }
    }
   
    authentication();

  }, []);


  return (
  <>
    <HRNavbar></HRNavbar>
    <div style={dashboardStyle}>
      <div style={statusContainerStyle}>
        <StatusCard
          title="Job"
          count="8"
          color="#9d8ee1"
          icon={<FaBriefcase />}
        />
        <StatusCard
          title="Interview"
          count="16"
          color="#f1c40f"
          icon={<FaCalendarCheck />}
        />
        <StatusCard
          title="Applicant"
          count="9"
          color="#2ecc71"
          icon={<FaUsers />}
        />
      </div>
      <div style={separatorStyle}></div>
      <InterviewList />
    </div>
  </>
  );
};

const dashboardStyle = {
  marginTop: '100px',
  padding: '10px',
};

const statusContainerStyle = {
  display: 'flex',
  gap: '50px',
  justifyContent: 'flex-start',
  marginBottom: '30px',
  marginLeft: '30px', // Add left margin to container
};




const separatorStyle = {
  height: '2px',
  backgroundColor: '#f1c40f',
  marginBottom: '20px',
  margin: '40px'
};

export default HRInterviewPage;
