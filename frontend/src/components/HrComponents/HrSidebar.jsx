import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaCalendarCheck, FaUsers } from 'react-icons/fa';

import StatusCard from '../../components/StatusCard';

function HrSidebar({ onSidebarClick }) { 
  const [color1, setColor1] = useState('#f2d5ff')
  const [color2, setColor2] = useState('#fff')

  const onClickButton = (color, clickOn) => {
    switch (clickOn) {
      case "job":
        setColor1(color);
        setColor2('#fff');
        onSidebarClick('job');
        break;
      case "interview":
        setColor2(color);
        setColor1('#fff');
        onSidebarClick('interview'); 
        break;
    }
  }
  
  return (
    <div style={sidebarStyle}>
      <center>
        <p style={fontStyle}>Create Your Post</p>
        <Link to={'/CreatePost'}>
          <button style={buttonStyle}>Create</button>
        </Link>
        <div>
          <div style={statusStyle} onClick={() => onClickButton("#f2d5ff", "job")}>
            <StatusCard
              title="Job"
              count="8"
              color={color1}
              icon={<FaBriefcase />}
              iconAndTextColor="#9d8ee1"
            />
          </div>
          <div style={statusStyle} onClick={() => onClickButton("#faffd5", "interview")}>
            <StatusCard
              title="Interview"
              count="16"
              color={color2}
              icon={<FaCalendarCheck />}
              iconAndTextColor="#f1c40f"
            />
          </div>

        </div>
      </center>
    </div>
  );
}

const sidebarStyle = {
    width: '220px',
    padding: '20px',
    marginLeft: '30px',
};

const fontStyle = {
  fontWeight: 'bold',
  fontSize: '22px',
}

const buttonStyle = {
  marginTop: '10px',
  marginBottom: '70px',
  padding: '10px 20px',
  backgroundColor: '#ff6b6b',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  borderRadius: '5px',
  width: '180px'
 };

const statusStyle = {
  marginBottom: '40px'
}

export default HrSidebar;
