import React from 'react';
import { MdOutlineWork } from "react-icons/md";
import { Link } from 'react-router-dom';

function HrSidebar() {

  return (
    <div style={sidebarStyle}>
      <Link to={'/CreatePost'}>
      <button style={buttonStyle}>Create Your Post</button>
      </Link>
      <div>
        <div>
            <MdOutlineWork />
            <p>job : 8</p>
        </div>
      </div>
    </div>
  );
}

const sidebarStyle = {
    width: '200px',
    padding: '20px',
  };

  const buttonStyle = {
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff6b6b',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '5px',
  };


export default HrSidebar;
