import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/navbar/UserNavbar.jsx';
import CompanyList from '../components/userComponents/userCompanyList.jsx';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Userindexpage = () => {
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
        <Form.Control
          placeholder="อธิบายงานที่เหมาะกับคุณให้เราฟังสิ   ?"
          style={inputStyle}
        />
        <Button variant="outline-primary" id="button-addon2">
          หางาน
        </Button>
        </div>
        <CompanyList></CompanyList>
    </>
  );
};

const inputStyle = {
    width: '600px' 
  };

const formStyle = {
    display: 'flex',
    margin: '40px',
    justifyContent: 'center',
    marginTop: '100px',
  };

export default Userindexpage;
