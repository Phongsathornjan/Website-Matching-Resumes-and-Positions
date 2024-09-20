import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaCalendarCheck,  } from 'react-icons/fa';

import StatusCard from '../StatusCard';

function HrInterviewSidebar() {
  const [color1, setColor1] = useState('#f2d5ff')
  const [color2, setColor2] = useState('#fff')

  const onClickButton = (color, clickOn) => {
    switch (clickOn) {
      case "job":
        setColor1(color)
        setColor2('#fff')
        setColor3('#fff')
        break;
      case "interview":
        setColor2(color)
        setColor1('#fff')
        setColor3('#fff')
        break;

    }
  }
  
  return (
    <div style={sidebarStyle}>
      <center>
        <div>
          <div style ={statusStyle} onClick={() => onClickButton("#f2d5ff","job")}>
            <StatusCard
              title="Job"
              count="8"
              color={color1}
              icon={<FaBriefcase />}
              iconAndTextColor = "#9d8ee1"
            />
          </div>
          <div style ={statusStyle} onClick={() => onClickButton("#faffd5","interview")}>
            <StatusCard
              title="Interview"
              count="16"
              color={color2}
              icon={<FaCalendarCheck />}
              iconAndTextColor = "#f1c40f"
            />
          </div>
        </div>
      </center>
    </div>
  );
}

const sidebarStyle = {
    width: '250px',
    padding: '20px',
  };

 const statusStyle = {
  marginBottom: '40px'
 }

export default HrInterviewSidebar;
