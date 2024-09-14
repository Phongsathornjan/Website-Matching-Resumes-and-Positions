import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HRNavbar from './../components/navbar/HRNavbar';
import HrSidebar from '../components/HrComponents/Hrsidebar';
import HrJobPost from '../components/HrComponents/HrJobPost';

const HrIndexPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {

    }

    const handlePrev = () => {
      
    }

    useEffect(() => {

      //Authentication Hr role
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
            <div></div>
            <div style={SlideNavigation}>
              <button style={NavigationButton} onClick={handlePrev} disabled={currentSlide === 0}>
                {'<'}
              </button>
              <div style={{ width: '40px' }}></div>
              <button style={NavigationButton} onClick={handleNext} disabled={currentSlide === 3}>
                {'>'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const HrIndexStyle = {
    animation: 'fadeInFromBottom 0.5s ease-in',
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
    animation: 'fadeInFromBottom 0.5s ease-in',
  };

  const contentStyle = {
    marginLeft: '420px', 
    width: '100%',
  };

  const NavigationButton = {
    backgroundColor: '#fff',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    border: 'none',
    margin: '0 10px',
    position: 'relative', // ตำแหน่งของปุ่ม
  };
  
  const SlideNavigation = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    position: 'relative'
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