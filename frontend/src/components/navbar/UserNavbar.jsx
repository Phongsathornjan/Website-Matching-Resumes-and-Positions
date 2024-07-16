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
  fontSize: "20px",
  color: "#3769B4",
  fontFamily: "Trirong",
  position: "fixed",
  top: 0,
  width: "100%",
  backgroundColor: "white",
  zIndex: 1000,
  padding: "10px 40px",
  boxShadow: "0 1px 4px -2px gray"
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