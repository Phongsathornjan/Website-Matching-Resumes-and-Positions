import React, { useEffect, useState} from 'react';
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/navbar/UserNavbar.jsx';
import CompanyList from '../components/userComponents/userCompanyList.jsx';
import LocationOptions from '../components/LocationOptions';
import JobFieldOptions from '../components/Data/jobField';
import axios from 'axios';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SlidePage from '../components/SlidePage';
import Bottombar from './../components/navbar/Bottombar';
import { FaBriefcase, FaUser } from 'react-icons/fa';
import StatusCard from '../components/StatusCard';
import MatchCompanyList from './../components/userComponents/MatchCompanyList';
import NewCompanyList from './../components/userComponents/NewCompanyList';
import MyJob from './../components/userComponents/MyJob';
import Alert from './../components/Alert';

import { careerFileContext } from '../context/careerFileContext'
import { JobListUserContext } from "../context/JobListUserContext"

const Userindexpage = () => {
  const navigate = useNavigate();

  const [jobList,setJobList] = useState('null')

  const [isResume, setIsResume] = useState(null)
  const [appState, setAppState] = useState("Recommend Job")

  const [prompt, setPrompt] = useState("null");
  const [location, setLocation] = useState('null');
  const [jobfield, setJobField] = useState("null");
  const [color1, setColor1] = useState('#fff');
  const [color2, setColor2] = useState('#fff');
  const [color3, setColor3] = useState('#B7E4B0');

  useEffect(() => {
    if(jobfield != 'null'){
      SearchPosts()
    }
  }, [jobfield]);

  const setAllInputNull = () => {
    document.getElementById("Search").value = "";
    setPrompt("null")
    setLocation("null")
    setJobField("null")
    setJobList("null")
  }

  const onClickButton = (color, clickOn) => {
    switch (clickOn) {
      case 'New Job':
        setColor1(color);
        setColor2('#fff');
        setColor3('#fff');
        setAllInputNull()
        setAppState('New Job')
        setTimeout(function() {
          window.scrollTo({
            top: 680,        
            behavior: 'smooth' 
          });
        }, 100);        
        break;
      case 'My Job':
        setColor2(color);
        setColor1('#fff');
        setColor3('#fff');
        setAllInputNull()
        setAppState('My Job')
        setTimeout(function() {
          window.scrollTo({
            top: 680,        
            behavior: 'smooth' 
          });
        }, 100);  
        break;
      case 'Recommend Job':
        setColor3(color);
        setColor1('#fff');
        setColor2('#fff');
        setAllInputNull()
        setAppState('Recommend Job')
        setJobField("null")
        setTimeout(function() {
          window.scrollTo({
            top: 680,        
            behavior: 'smooth' 
          });
        }, 100);    
        break;
    }
  };

  const checkResume = async () => {
    const userId = localStorage.getItem('id_user')
    const response = await axios.get(`http://localhost:4001/checkValidResume/${userId}`);
    if(response.status == 200){
      setIsResume(true)
    }else{
      setIsResume(false)
    }
  }

  const SearchPosts = async () => {
    setAllColorWhite()
    try{
      const encodedTextSearch = encodeURIComponent(prompt);
      const encodedLocation = encodeURIComponent(location);
      const encodedJobField = encodeURIComponent(jobfield);  
      const response = await axios.get(`http://localhost:4001/getPostBySearch/${encodedTextSearch}/${encodedLocation}/${encodedJobField}`)
      setJobList(response.data)
      console.log(response.data)
    }catch(e){
      console.log(e)
    }
  }

  const setAllColorWhite = () => {
    setColor1('#fff')
    setColor2('#fff')
    setColor3('#fff')
  }

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

    authentication()
    checkResume()
  }, []);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <UserNavbar></UserNavbar>
      <div style={{ height: '60px' }}></div>

      <div style={containerStyle}>
        <div style={leftColumnStyle}>
          <div style={inputContainerStyle}>
            <Form.Control
              id='Search'
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
              {jobfield == 'null' ? (
                <Select
                options={JobFieldOptions}
                placeholder="สายอาชีพ"
                styles={{ width: '100%' }}
                onChange={(e) => setJobField(e.value)}
                />
              ):(
                <Select
                options={JobFieldOptions}
                placeholder={jobfield}
                styles={{ width: '100%' }}
                onChange={(e) => setJobField(e.value)}
                />
              )}
              </div>
              <Button variant="btn" id="button-addon2" style={buttonStyle} onClick={SearchPosts}>
                หางาน
              </Button>
            </div>
          </div>
        </div>

        <div style={rightColumnStyle}>
          <div style={{...HomeStyle, backgroundColor: color3}} onClick={() => onClickButton('#B7E4B0','Recommend Job')}>
            <center>
            <div style={{color: 'green'}}><FaHome /></div>
            <p style={{color: 'green',  fontSize: '18px',fontWeight: 'bold'}}>Recommend Job</p>
            </center>
          </div>

          <div style={{ ...statusStyle, position: 'relative' }} onClick={() => onClickButton('#FEB3B7', 'New Job')}>
            <Alert text="New!"/>
            <StatusCard
              title="New Job"
              count="0"
              color={color1}
              icon={<FaUser />}
              iconAndTextColor="#FD3A44"
            />
          </div>
          
          <div style={{ ...statusStyle, position: 'relative' }} onClick={() => onClickButton('#f2d5ff', 'My Job')}>
            <Alert text="New!"/>
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

      {jobList == 'null' ? (
        <>
          <careerFileContext.Provider value={[jobfield,setJobField]}>
            <div onClick={setAllColorWhite}>
              <SlidePage></SlidePage>
            </div>
          </careerFileContext.Provider>
          {appState === "Recommend Job" && <>
            {isResume ? (
            <>
              <div style={{ height: '30px' }}></div>
              <MatchCompanyList/>
            </>
          ):(
            <center>
            <div>
              <img src="../../public/PleaseSelectFiled.png" style={{ marginTop: '60px' }} />
            </div>
            <div style={{ marginTop: '20px' }}>
              <span style={{ color: '#828282', fontSize: '48px' }}>กรุณาเลือกสายอาชีพ</span>
            </div>
          </center>
          )}
          </>
          }
          {appState === "New Job" && 
          <>
            <div style={{ height: '30px' }}></div>
            <NewCompanyList/>
          </>}
          {appState === "My Job" && 
          <>
            <div style={{ height: '30px' }}></div>
            <MyJob/>
          </>}

        </>
      ) : (
        <JobListUserContext.Provider value={[jobList,setJobList]}>
          <CompanyList></CompanyList>
        </JobListUserContext.Provider>
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
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between', 
  gap: '20px', 
  marginLeft: '40px'
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

const HomeStyle = {
  width: '120px',
  paddingTop: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  transition: 'background-color 0.5s ease',
  borderRadius: '10px',
  fontFamily: 'Trirong',
}

export default Userindexpage;
