import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HRNavbar from './../components/navbar/HRNavbar';
import HrSidebar from '../components/HrComponents/Hrsidebar';

const HrIndexPage = () => {
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
            if(response.data.userData.role != "hr"){
              navigate('/SignIn');
            }
          }
        } catch(err){
          console.log(err)
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

    return (
      <>
        <HRNavbar></HRNavbar>
        <div style={HrIndexStyle}>
        <div style={sideBarStyle}>
        <HrSidebar></HrSidebar>
        </div>
        </div>
      </>
    );
  };

  const sideBarStyle = {
    marginTop: '150px'
  }

  const HrIndexStyle = {
    animation: 'fadeInFromBottom 0.5s ease-in',
  }

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