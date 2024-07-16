import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/UserNavbar.jsx';
import axios from 'axios';
import UserJobApplicationList from '../components/userComponents/userJobApplicationForm.jsx'

const userJobApplicationPage = () => {
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
          setIsLoggedIn(true);
        }else{
          setIsLoggedIn(false);
          navigate('/SignIn');
        }
      } catch(err){
        setIsLoggedIn(false);
        navigate('/SignIn');
      }
    }
   
    authentication();
  }, []);

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
