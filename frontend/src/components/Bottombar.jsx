import React from 'react'
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

// ลง npm install react-icons

function Bottombar() {
  return (
    <div style={{margin: '40px', marginTop: '100px'}}>
      <hr/>
      <div style={{marginTop: "30px"}}>
      <div style={{fontSize: '24px'}}>Contact for information</div>
      <div style={{color: 'gray'}}>
      <div style={{marginTop: "15px"}}>Phongsathornjanjamsai@gmail.com</div>
      <div style={{marginTop: "5px"}}>Passakornvanchana@gmail.com</div>
      </div>
      </div>
      <div style={socialLinksStyle}>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <FaYoutube />
      </a>
    </div>
    </div>
  )
}

const socialLinksStyle = {
  display: 'flex',
  gap: '25px',
  marginTop: '20px',
};

export default Bottombar

