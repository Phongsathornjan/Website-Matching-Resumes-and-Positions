import React from 'react'
import { Link } from 'react-router-dom'

const HRNavbar = () => {
  return (
    <div style={navbarStyle}>
      <div>
      <Link to={'#'} style={linkStyle} >Resume Union</Link>
      </div>
      <div style={rightBarStyle}>
      <div>
      <Link to={'#'} style={linkStyle} >หาผู้สมัคร</Link>
      </div>
      <div>
      <Link to={'#'} style={linkStyle} >จัดการโพสต์</Link>
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
  fontFamily: "Trirong",
  position: "fixed",
  top: 0,
  width: "100%",
  backgroundColor: "#639CF2",
  zIndex: 1000,
  padding: "10px 40px",
  boxShadow: "0 1px 4px -2px gray"
}

const linkStyle = {
  textDecoration: 'none',
  color: '#fff'
};

const rightBarStyle = {
  width: "500px",
  justifyContent: "space-between",
  display: "flex"
};

export default HRNavbar
