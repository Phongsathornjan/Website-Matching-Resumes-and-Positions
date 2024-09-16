import React, {useEffect,useState} from "react";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const HrJobPost = () => {
  const [jobList,setJobList] = useState([])
  const jobsPerPage = 6; // จำนวนงานต่อหน้า
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // แสดงรายการงานเฉพาะหน้านั้น ๆ
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = jobList.slice(startIndex, endIndex);

  async function getPost() {
    const userId = localStorage.getItem('id_user')
    try{
      const response = await axios.get(`http://localhost:4001/getPost/${userId}`)
      setJobList(response.data)
    }catch(err){
      console.log(err)
    }

  }
  
  const OnClickDeletePost = async (idPost) => {
    try{
      const response = await axios.delete(`http://localhost:4001/deletePost/${idPost}`)
      if(response.status == 200){
        window.location.reload()
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    setTotalPages(Math.ceil(jobList.length / jobsPerPage));
  }, [jobList]);

  useEffect(() => {
    //Get Post
    getPost()

    // เพิ่ม global animation style
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyle;
    document.head.appendChild(styleSheet);

    // ลบ style เมื่อ component ถูกทำลาย
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div>
      {/* ตรวจสอบว่า jobList ว่างหรือไม่ */}
      {jobList.length === 0 ? (
        <center>
          <div style={{animation: 'fadeInFromBottom 0.6s ease-in'}}>
            <div style={{fontSize: '20px',color: 'gray',marginTop: '80px'}}>คุณยังไม่มีโพสต์รับสมัคร สามารถสร้างได้เลยตอนนี้</div>
            <img src="../../../public/PleaseSelectFiled.png" style={imgStyle}/> 
          </div>
        </center>
      ) : (
        <>
          {currentJobs.map(job => (
            <Card key={job.time_stamp} className="mb-3" style={cardStyle}>
              <Card.Body>
                <div style={{display: 'flex',justifyContent: 'space-between'}}>
                  <Card.Title style={ellipsisStyle}>{job.Position}</Card.Title>
                  <Button variant="danger" onClick={() => OnClickDeletePost(job._id)}>Delete</Button>
                </div>
                <Card.Subtitle className="mb-2 text-muted">{job.Salary}</Card.Subtitle>
                <Card.Text style={ellipsisStyle}>Requirements : {job.Requirements}</Card.Text>
                <Card.Text style={ellipsisStyle}>Qualifications : {job.Qualifications}</Card.Text>
                <Card.Text style={ellipsisStyle}>Experience : {job.Experience}</Card.Text>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Card.Text>โพสต์เมื่อวันที่ : {moment(Number(job.time_stamp)).format('DD-MM-YYYY')}</Card.Text>
                  <div style={{width: '250px',display: 'flex',justifyContent: 'space-between'}}>
                    <Link to={`/PostDetail/:${job._id}`}>
                      <Button variant="success">More detail</Button>
                    </Link>
                    <Link to={'#'}>
                    <Button variant="success">Find candidate</Button>
                    </Link>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
          <div style={SlideNavigation}>
            <button style={NavigationButton} onClick={handlePrev} disabled={currentPage === 1}>
              {'<'}
            </button>
            <div>Page {currentPage} of {totalPages}</div>
            <button style={NavigationButton} onClick={handleNext} disabled={currentPage === totalPages}>
              {'>'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const ellipsisStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',        
  textOverflow: 'ellipsis'     
};


const cardStyle = {
  width: '1000px',
  borderRadius: '20px',
  animation: 'fadeInFromBottom 0.6s ease-in',
};

const NavigationButton = {
  backgroundColor: '#fff',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  border: 'none',
  margin: '0 10px',
  position: 'relative',
};

const SlideNavigation = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px',
  position: 'relative'
};

const imgStyle = {
  width: '400px'
}

const globalStyle = `
@keyframes fadeInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}`;

export default HrJobPost;
