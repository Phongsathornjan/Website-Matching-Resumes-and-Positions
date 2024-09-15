import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import HRNavbar from './../components/navbar/HRNavbar';
import HrSidebar from '../components/HrComponents/Hrsidebar';
import HrJobPost from '../components/HrComponents/HrJobPost';

const HrIndexPage = () => {
    const navigate = useNavigate();

    async function authentication() {
      try{
        let token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:4001/auth', {} ,{
          headers: {
            'x-access-token': token
          }
        })

        if(response.status == 200){
          if(response.data.userData.role != "hr"){
            navigate('/SignIn');
          }
        }
      } catch(err){
        console.log(err)
        navigate('/SignIn');
      }
    }

    useEffect(() => {

      //Authentication Hr role
      authentication();

      //add animation
      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = globalStyle;
      document.head.appendChild(styleSheet);
  
      // Cleanup on component unmount
      return () => {
        document.head.removeChild(styleSheet);
      };
    }, []);

    return (
      <>
        <HRNavbar/>
        <div style={{height: "100px"}}></div>
        <div style={HrIndexStyle}>
          <div style={sidebarStyle}>
            <HrSidebar />
          </div>
          <div style={contentStyle}>
            <HrJobPost />
          </div>
        </div>
      </>
    );
  };

  const HrIndexStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px'
  }

  const sidebarStyle = {
    position: 'fixed', 
    top: '100px',    
    left: '20px',   
    width: '250px',   
    height: 'calc(100vh - 120px)', 
    overflowY: 'auto',  
  };

  const contentStyle = {
    marginLeft: '420px', 
    width: '100%',
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
}`;

  export default HrIndexPage