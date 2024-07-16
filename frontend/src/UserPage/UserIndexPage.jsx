import React from 'react';
import UserNavbar from '../components/navbar/UserNavbar.jsx';
import CompanyList from '../components/CompanyList.jsx';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Userindexpage = () => {

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
