import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from '../components/navbar/UserNavbar'
import RecommendList from '../components/userComponents/RecommendList';

function RecommendJobPage() {
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
    <UserNavbar></UserNavbar>
    <div style={formStyle}>
    </div>
    <RecommendList></RecommendList>
    </>
  )
}

  const formStyle = {
    display: 'flex',
    margin: '40px',
    marginTop: '100px',
    justifyContent: 'center'
  };


export default RecommendJobPage

