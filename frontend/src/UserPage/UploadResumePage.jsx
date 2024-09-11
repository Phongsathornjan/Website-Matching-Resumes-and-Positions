import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from '../components/navbar/UserNavbar'
import Resume from '../components/userComponents/Resume';


function UploadResumePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          if(response.data.userData.role != "member"){
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
    <UserNavbar></UserNavbar>
    <div style={formStyle}>
    </div>
    <Resume></Resume>
    </>
  )
}

  const formStyle = {
    margin: '40px',
    marginTop: '140px',
  };


export default UploadResumePage

