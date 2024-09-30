import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import moment from 'moment'

import { MdDone } from "react-icons/md";
import { IoAlert } from "react-icons/io5";

const userJobApplicationForm = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idPost = queryParams.get('idPost');
  const id_User = localStorage.getItem('id_user')

  const [jobDetail,setJobDetail] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [isApplicantExists, setIsApplicantExists] = useState(false)

  useEffect(() => {
    window.scrollTo(0,0);
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyle;
    document.head.appendChild(styleSheet);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    if(!idPost){
      navigate("/UserIndexPage")
    }else{
      getPostDetail()
    }
  }, []);

  useEffect(() => {
    if(jobDetail.length != 0){
      setIsApplicantExists(jobDetail.applicants.some(applicant => applicant.userId === id_User))
    }
  }, [jobDetail]);

  const getPostDetail = async () => {
    setIsLoading(true)
    try{
      const response = await axios.get(`http://localhost:4001/getPostDetail/${idPost}`)
      setIsLoading(false)
      setJobDetail(response.data)
    }catch(err){
      console.log(err)
    }
  }

  const ApplyJobButton = async () => {
    try{
      const response = await axios.patch(`http://localhost:4001/applyPost/${idPost}/${id_User}`)
      swal({
        title: "OK!",
        text: "สมัครงานเรียบร้อย!",
        icon: "success"
      }).then(() => {
        // Reload หลังจากกดปุ่ม OK
        window.location.reload();
      });
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      {isLoading ? (
        <center><div style={spinnerStyle}></div></center>
      ):(
        <div className="container" style={Fade}>
        <section className="mb-5 w-75">
          <h5><strong>About company</strong></h5>
          <div className="card p-3 mb-3 mt-3">
            <p><strong>{jobDetail.companyName}</strong></p>
            <p>Detail : {jobDetail.companyDetail}</p>
          </div>
        </section>
        <section className="mb-5 w-75">
          <h5><strong>Full Descriptions</strong></h5>
          <div className='card mt-3 p-4'>
          <h4><strong>Position : {jobDetail.Position}</strong></h4>
          <p>สถานที่ทำงาน : </p>
          <p>เงินเดือน : {jobDetail.Salary} </p>
          <h5><strong>JobDescription : </strong></h5>
            <div className='mt-2 mb-3'>
              {jobDetail.JobDescription}
            </div>
          <h5><strong>Qualifications : </strong></h5>
            <div className='mt-1 mb-3'>
              {jobDetail.Qualifications}
            </div>
          <h5><strong>Experience : </strong></h5>
          <div className="mb-3">
            {jobDetail.Experience}
          </div>
          <h5><strong>Working</strong></h5>
          <p className="mb-1">Working Location : {jobDetail.Location}</p>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p className="mb-1">โพสต์เมื่อ : {moment(Number(jobDetail.time_stamp)).format('DD-MM-YYYY')}</p>
            {isApplicantExists ? (
                <button className="btn btn-secondary" disabled>
                    <MdDone /> สมัครแล้ว
                </button>
            ) : (
                <button className="btn btn-success" onClick={ApplyJobButton}>
                    สมัครเลย <IoAlert/> 
                </button>
            )}
          </div>
          </div>
        </section>
      </div>
      )}
    </>
  );
};

const Fade = {
  animation: 'fadeInFromBottom 1s ease-in',
};

const spinnerStyle = {
  border: '4px solid rgba(0, 0, 0, 0.1)',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  borderLeftColor: '#09f',
  animation: 'spin 1s ease infinite'
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

body {
  margin: 0;
  font-family: 'Trirong', sans-serif;
}
`;

export default userJobApplicationForm;
