import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/navbar/UserNavbar.jsx';
import CompanyList from '../components/userComponents/userCompanyList.jsx';
import LocationOptions from '../components/LocationOptions';
import JobFieldOptions from '../components/Data/jobField';
import axios from 'axios';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { careerFileContext } from '../context/careerFileContext';
import SlidePage from '../components/SlidePage';
import Bottombar from './../components/navbar/Bottombar';
import { FaBriefcase, FaUser } from 'react-icons/fa';
import StatusCard from '../components/StatusCard';

const Userindexpage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);
  const [location, setLocation] = useState('Bangkok');
  const [jobfield, setJobField] = useState(null);
  const [color1, setColor1] = useState('#fff');
  const [color2, setColor2] = useState('#fff');

  const onClickButton = (color, clickOn) => {
    switch (clickOn) {
      case 'job':
        setColor1(color);
        setColor2('#fff');
        break;
      case 'interview':
        setColor2(color);
        setColor1('#fff');
        break;
    }
  };

  useEffect(() => {
    async function authentication() {
      try {
        let token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:4001/auth',
          {},
          {
            headers: {
              'x-access-token': token,
            },
          }
        );

        if (response.status === 200) {
          if (response.data.userData.role !== 'member') {
            navigate('/SignIn');
          }
        } else {
          navigate('/SignIn');
        }
      } catch (err) {
        navigate('/SignIn');
      }
    }

    authentication();
  }, []);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <UserNavbar></UserNavbar>
      <div style={{ height: '60px' }}></div>

      <div style={containerStyle}>
        <div style={leftColumnStyle}>
          <div style={inputContainerStyle}>
            <Form.Control
              placeholder="อธิบายงานที่เหมาะกับคุณให้เราฟังสิ ?"
              style={inputStyle}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div style={formRowStyle}>
              <div style={dropdownWrapperStyle}>
                <Select
                  options={LocationOptions}
                  placeholder="พื้นที่ทำงาน"
                  styles={selectStyle}
                  onChange={(e) => setLocation(e.value)}
                />
              </div>
              <div style={dropdownWrapperStyle}>
                <Select
                  options={JobFieldOptions}
                  placeholder="สายอาชีพ"
                  styles={selectStyle}
                  onChange={(e) => setJobField(e.value)}
                />
              </div>
              <Button variant="btn" id="button-addon2" style={buttonStyle}>
                หางาน
              </Button>
            </div>
          </div>
        </div>

        <div style={rightColumnStyle}>
          <div style={statusStyle} onClick={() => onClickButton('#f2d5ff', 'job')}>
            <StatusCard
              title="Job"
              count="8"
              color={color1}
              icon={<FaBriefcase />}
              iconAndTextColor="#9d8ee1"
            />
          </div>
          <div style={statusStyle} onClick={() => onClickButton('#dbffd5', 'interview')}>
            <StatusCard
              title="Interview"
              count="16"
              color={color2}
              icon={<FaUser />}
              iconAndTextColor="#2ecc71"
            />
          </div>
        </div>
      </div>

      {!jobfield ? (
        <>
          <careerFileContext.Provider value={[jobfield, setJobField]}>
            <SlidePage></SlidePage>
          </careerFileContext.Provider>
          <center>
            <div>
              <img src="../../public/PleaseSelectFiled.png" style={{ marginTop: '60px' }} />
            </div>
            <div style={{ marginTop: '20px' }}>
              <span style={{ color: '#828282', fontSize: '48px' }}>กรุณาเลือกสายอาชีพ</span>
            </div>
          </center>
        </>
      ) : (
        <CompanyList></CompanyList>
      )}
      <div style={{ height: '200px' }}></div>
      <Bottombar></Bottombar>
    </div>
  );
};

const inputStyle = {
  width: '100%',
};

const buttonStyle = {
  width: '20%', 
  backgroundColor: '#3769B4',
  color: '#fff',
  height: '38px', 
};

const inputContainerStyle = {
  width: '100%', 
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};


const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '40px 200px',
  gap: '20px',
};

const formRowStyle = {
  display: 'flex',
  alignItems: 'center', 
  gap: '20px', 
  width: '100%', 
};

const dropdownWrapperStyle = {
  flex: 1, 
  width: '75%',
};

const leftColumnStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const rightColumnStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center', 
  gap: '20px', 
  
};

const statusStyle = {
  flex: 1,
  padding: '10px',
  backgroundColor: 'transparent',
  borderRadius: '50px',
  transform: 'scale(1.2)', 
  transition: 'transform 0.3s ease', 
  marginLeft: '50px'
};

const selectStyle = {
  flex: 1
};

export default Userindexpage;
