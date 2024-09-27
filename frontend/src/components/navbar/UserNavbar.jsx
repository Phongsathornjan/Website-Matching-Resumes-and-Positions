import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const UserNavbar = () => {
  const navigate = useNavigate();

  const SignOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('id_user');
    navigate('/SignIn');
  }

  return (
    <div style={navbarStyle}>
      <div>
      <Link to={'/UserIndexPage'} style={linkStyle} >Resume Union</Link>
      </div>
      <div>
        <div className="dropdown">
          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
            My Account
          </button>
          <ul className="dropdown-menu">
            <Link to={'/MyInformation'} style={linkStyle}>
              <li><p className="dropdown-item">ข้อมูลส่วนตัว</p></li>
            </Link>
            <Link to={'/uploadResumePage'} style={linkStyle}>
              <li><p className="dropdown-item">My Resume</p></li>
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


export default UserNavbar