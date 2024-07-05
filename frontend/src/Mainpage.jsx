import { useState } from 'react'
import './components/Navbar.jsx'
import Navbar from './components/Navbar.jsx'
import './css/index.css'
import './components/CreatePostForm.jsx'
import CreatePostForm from './components/CreatePostForm.jsx';
import './components/SendEmailForm.jsx'
import SendEmailForm from './components/SendEmailForm.jsx';

function App() {

  return (
    <>
    <div style={{ fontFamily: 'Trirong' }}>
      <Navbar></Navbar>
      <CreatePostForm></CreatePostForm> 
      {/* <SendEmailForm></SendEmailForm>  */}
    </div>
    </>
    //เปลี่ยนหน้าเอาได้ แก้เอาคอมเม้นต์ออก CreatePostForm , SendEmailForm
  )
}

export default App
