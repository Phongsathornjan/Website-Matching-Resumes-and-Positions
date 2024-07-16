import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const UserNavbar = () => {

  const SignOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('id_user');
    window.location.reload();
  }

  return (
    <div style={navbarStyle}>
      <div>
      <Link to={'/UserIndexPage'} style={linkStyle} >Resume Union</Link>
      </div>
      <div style={rightBarStyle}>
        <div>
        <Link to={'#'} style={linkStyle} >Job Recommend Feature</Link>
        </div>
        <div>
        <Link to={'#'} style={linkStyle} >find a job</Link>
        </div>
        <div>
        <Link to={'#'} style={linkStyle} >Notification</Link>
        </div>
        <div class="dropdown">
          <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
            My Account
          </button>
          <ul class="dropdown-menu">
            <Link to={'/MyInformation'} style={linkStyle}>
              <li><a class="dropdown-item">ข้อมูลส่วนตัว</a></li>
            </Link>
            <Link to={'/MyResume'} style={linkStyle}>
              <li><a class="dropdown-item">My Resume</a></li>
            </Link>
              <li><a class="dropdown-item" onClick={SignOut}>Sign out</a></li>
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
  width: "650px",
  justifyContent: "space-between",
  display: "flex"
};

export default UserNavbar