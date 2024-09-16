import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/navbar/UserNavbar.jsx';
import NewCompanyList from '../components/userComponents/NewCompanyList.jsx';
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

const NewLabel = () => (
  <div style={newLabelStyle}>
    NEW!
  </div>
);

const UserResumeIndexPage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);
  const [location, setLocation] = useState('Bangkok');
  const [jobfield, setJobField] = useState(null);
  const [color1, setColor1] = useState('#fff');
  const [color2, setColor2] = useState('#fff');

  const onClickButton = (color, clickOn) => {
    switch (clickOn) {
      case 'New Job':
        setColor1(color);
        setColor2('#fff');
        break;
      case 'My Job':
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
      <UserNavbar />
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
          <div style={{ ...statusStyle, position: 'relative' }} onClick={() => onClickButton('#FEB3B7', 'New Job')}>
            <NewLabel />
            <StatusCard
              title="New Job"
              count="0"
              color={color1}
              icon={<FaUser />}
              iconAndTextColor="#FD3A44"
            />
          </div>
          
          <div style={{ ...statusStyle, position: 'relative' }} onClick={() => onClickButton('#f2d5ff', 'My Job')}>
            <NewLabel /> 
            <StatusCard
              title="My Job"
              count="0"
              color={color2}
              icon={<FaBriefcase />}
              iconAndTextColor="#9d8ee1"
            />
          </div>
        </div>
      </div>

      <>
        <careerFileContext.Provider value={[jobfield, setJobField]}>
          <SlidePage />
        </careerFileContext.Provider>
      </>
      <div style={{ height: '30px' }}></div>
      <NewCompanyList />

      <div style={{ height: '200px' }}></div>
      <Bottombar />
    </div>
  );
};

// Styles for the components
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
  marginLeft: '50px',
};

const newLabelStyle = {
  position: 'absolute',
  backgroundColor: '#FD3A44',
  color: '#fff',
  fontSize: '12px',
  fontWeight: 'bold',
  borderRadius: '20px',
  padding: '3px 10px',
  top: '-10px',
  left: '-10px',
};

const selectStyle = {
  flex: 1,
};

export default UserResumeIndexPage;
