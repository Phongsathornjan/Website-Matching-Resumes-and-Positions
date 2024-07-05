import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{display: "flex",justifyContent: "space-between",marginTop: "50px",margin: "40px",fontSize: "20px",color: "#3769B4",fontFamily: "Trirong"}}>
      <div>
      <Link to={'#'}>Resume Union</Link>
      </div>
      <div style={{width: "500px",justifyContent: "space-between",display: "flex"}}>
      <div>
      <Link to={'#'}>หางานที่เหมาะสมกับคุณ</Link>
      </div>
      <div>
      <Link to={'#'}>สมัครสมาชิก</Link>
      </div>
      <div>
      <Link to={'#'}>เข้าสู่ระบบ</Link>
      </div>
      </div>
    </div>
  )
}

export default Navbar
