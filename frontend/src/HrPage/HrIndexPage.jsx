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

    }, []);

    return (
      <>
        <HRNavbar></HRNavbar>
        <div style={sideBarStyle}>
        <HrSidebar></HrSidebar>
        </div>
      </>
    );
  };

  const sideBarStyle = {
    marginTop: '150px'
  }

  export default HrIndexPage