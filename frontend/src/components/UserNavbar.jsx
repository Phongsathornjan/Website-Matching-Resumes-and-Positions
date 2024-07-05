import React from 'react'
import { Link } from 'react-router-dom'

const UserNavbar = () => {
  return (
    <div style={{display: "flex",justifyContent: "space-between",marginTop: "50px",margin: "40px",fontSize: "20px",color: "#3769B4",fontFamily: "Trirong"}}>
      <div>
      <Link to={'#'}>Resume Union</Link>
      </div>
      <div style={{width: "600px",justifyContent: "space-between",display: "flex"}}>
      <div>
      <Link to={'#'}>แนะนำงานที่เหมาะสมกับคุณ</Link>
      </div>
      <div>
      <Link to={'#'}>หางาน</Link>
      </div>
      <div>
      <Link to={'#'}>แจ้งเตือน</Link>
      </div>
      <div>
      <Link to={'#'}>ข้อมูลส่วนตัว</Link>
      </div>
      </div>
    </div>
  )
}

export default UserNavbar