import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const HRNavbar = () => {
  const navigate = useNavigate();

  const SignOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('id_user');
    navigate('/SignIn');
  }

  return (
    <div style={navbarStyle}>
      <div>
      <Link to={'/HrIndexPage'} style={linkStyle} >Resume Union</Link>
      </div>
      <div style={rightBarStyle}>
      <div>
      <Link to={'#'} style={linkStyle} >Manage Post</Link>
      </div>
      <div>
      <Link to={'#'} style={linkStyle} >Interview Appointment</Link>
      </div>
      <div className="dropdown">
          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
            My Account
          </button>
          <ul className="dropdown-menu">
            <Link to={'#'} style={linkStyle}>
              <li><p className="dropdown-item">ข้อมูลส่วนตัว</p></li>
            </Link>
              <li><p className="dropdown-item" onClick={SignOut}>Sign out</p></li>
          </ul>
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
