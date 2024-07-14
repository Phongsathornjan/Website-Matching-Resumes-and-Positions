import React from 'react'
import { Link } from 'react-router-dom'

const UserNavbar = () => {
  return (
    <div style={navbarStyle}>
      <div>
      <Link to={'#'} style={linkStyle} >Resume Union</Link>
      </div>
      <div style={rightBarStyle}>
      <div>
      <Link to={'#'} style={linkStyle} >แนะนำงานที่เหมาะสมกับคุณ</Link>
      </div>
      <div>
      <Link to={'#'} style={linkStyle} >หางาน</Link>
      </div>
      <div>
      <Link to={'#'} style={linkStyle} >แจ้งเตือน</Link>
      </div>
      <div>
      <Link to={'#'} style={linkStyle} >ข้อมูลส่วนตัว</Link>
      </div>
      </div>
    </div>
  )
}

const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "50px",
  margin: "40px",
  fontSize: "20px",
  color: "#3769B4",
  fontFamily: "Trirong"
}

const linkStyle = {
  textDecoration: 'none',
  color: '#3769B4'
};

const rightBarStyle = {
  width: "600px",
  justifyContent: "space-between",
  display: "flex"
};

export default UserNavbar