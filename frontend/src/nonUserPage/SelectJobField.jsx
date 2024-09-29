import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import SlidePage from "../components/SlidePage.jsx";
import { careerFileContext } from "../context/careerFileContext";
import axios from 'axios';
import swal from 'sweetalert';

const SelectJobField = () => {
  const [jobfield, setJobField] = useState("null");
  const navigate = useNavigate();

  useEffect( () => {
    if(jobfield != "null"){
        upDateJobFiled()
    }
  }, [jobfield]);

  const upDateJobFiled = async () => {
    const userId = localStorage.getItem('id_user')
    try{
      const response = await axios.patch(`http://localhost:4001/UpdateJobField/${userId}/${jobfield}`)
      swal({
        title: "OK!",
        text: "สมัครสมาชิกเรียบร้อย",
        icon: "success"
      }).then(() => {
        navigate('/SignIn')
      });
    }catch(err){
      console.log(err)
      swal("Oops!", "Internal Server Error", "error")
    }
  }

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyle;
    document.head.appendChild(styleSheet);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div style={{ height: "100px" }}></div>   
      <center><p style={subheadingStyle}>กรุณาเลือกสายงานของคุณ</p></center>
      <careerFileContext.Provider value={[jobfield, setJobField]}>
        <SlidePage></SlidePage>
      </careerFileContext.Provider>
    </>
  );
};

const subheadingStyle = {
    fontSize: '32px',
    color: '#888888',
    marginBottom: '40px',
};

const globalStyle = `
  @keyframes fadeInFromBottom {
    0% {
      opacity: 0;
      transform: translateY(20px); /* เริ่มต้นจากด้านล่าง */
    }
    100% {
      opacity: 1;
      transform: translateY(0); /* เลื่อนกลับไปที่ตำแหน่งเดิม */
    }
  }
  
  body {
    margin: 0;
    font-family: 'Trirong', sans-serif;
  }
  `;

export default SelectJobField;
