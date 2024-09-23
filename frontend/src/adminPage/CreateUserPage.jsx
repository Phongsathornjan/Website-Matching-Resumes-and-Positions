import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Select from 'react-select';
import { Dropdown , Form } from "react-bootstrap";

import AdminNavbar from './AdminNavbar.jsx';
import jobFile from '../components/Data/jobField.js';
import LocationOptions from '../components/LocationOptions.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

const CreateUserPage = () =>{
const navigate = useNavigate();
  //member
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [role, setRole] = useState('member');
  const [jobField, setJobField] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [location, setLocation] = useState('Bangkok');

  //Hr
  const [companyName, setCompanyName] = useState('');
  const [companyDetail, setCompanyDetail] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const submit = async () => {
    try{
      const response = await axios.post('http://localhost:4001/register',{
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        location: location,
        role: role,
        jobField: jobField,
        companyName: companyName,
        companyDetail: companyDetail
      })
      if(response.status == 200){
        setError(null)
        setSuccess("สร้างสำเร็จ")
        setTimeout(function() {
          window.location.reload();
        }, 700); 
      }
   }catch(err){
      if(err.response.status == 400){
        setSuccess(null)
        setError(err.response.data.message);
      }
    }
  }

  useEffect(() => {
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
    <AdminNavbar></AdminNavbar>
    <div style={SignUpStyle}>
        <h1 style={titleStyle}>Create User</h1>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {success && <div className="alert alert-success" role="alert">{success}</div>}
        <form style={formStyle}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
              {role}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setRole("admin")}>admin</Dropdown.Item>
                <Dropdown.Item onClick={() => setRole("member")}>member</Dropdown.Item>
                <Dropdown.Item onClick={() => setRole("hr")}>hr</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div style={formRowStyle}>
                <input type="text" placeholder="Firstname" style={inputStyle} onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" placeholder="Lastname" style={inputStyle}  onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <input type="email" placeholder="Email" style={fullWidthInputStyle} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" style={fullWidthInputStyle} onChange={(e) => setPassword(e.target.value)}/>
            <Select
                options={LocationOptions}
                defaultValue={LocationOptions[0]} 
                placeholder="Select Location"
                styles={{ width: '100%' }}
                onChange={(e) => setLocation(e.value)}
            />
            <div style={{height: "10px"}}></div>
            {role == "member" && 
              <Select
              options={jobFile}
              placeholder="สายอาชีพ"
              styles={{ width: '100%' }}
              onChange={(e) => setJobField(e.value)}
              />
            }
            <div style={{height: "10px"}}></div>
            {role == "hr" && <>
              <input type="text" placeholder="Company Name" style={inputStyle} onChange={(e) => setCompanyName(e.target.value)}/>
              <Form.Control
              placeholder='Company detail'
              as="textarea"
              style={{ width: '100%', height: '150px' }}
              onChange={(e) => setCompanyDetail(e.target.value)}
              />
            </>}
            <center>
            <Link to={'#'}>
            <button type="submit" style={buttonStyle} onClick={submit}>Register</button>
            </Link>
            </center>
        </form>
      </div>
    </>
  );
};

const SignUpStyle = {
  margin: '40px',
  marginTop: '100px',
  width: '1440px',
  animation: 'fadeInFromBottom 0.5s ease-in',
}

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
};

const formRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

const inputStyle = {
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: 'calc(50% - 10px)', // Adjusting for padding and border
};

const buttonStyle = {
    padding: '10px',
    marginTop: '20px',
    backgroundColor: '#3769B4',
    color: 'white',
    border: 'none',
    fontFamily: 'Trirong',
    cursor: 'pointer',
  };

const fullWidthInputStyle = {
    ...inputStyle,
    width: '100%',
};

const titleStyle = {
    color: '#3769B4',
    fontFamily: 'Trirong',
    fontSize: '48px', // Adjusted to match the image size
    fontWeight: 'bold',
    marginBottom: '30px',
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
  }
  
  body {
    margin: 0;
    font-family: 'Trirong', sans-serif;
  }
  `;

export default CreateUserPage