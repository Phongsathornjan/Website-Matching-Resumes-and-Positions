import React, {useEffect,useState} from "react";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const jobList = [
  {
    id: 1,
    title: 'Junior Programmer1',
    company: 'บริษัท Ai จำกัด',
    location: 'กรุงเทพมหานคร',
    description: 'Web Application PHP, HTML, CSS, JavaScript, Web APIs, SQL, UX/UI...',
    requirements: 'วุฒิการศึกษาระดับปริญญาตรี สาขา Computer Science, Computer Engineering...',
    posted: 'ลงประกาศเมื่อ 30 วันที่ผ่านมา'
  },
  {
    id: 2,
    title: 'Junior Programmer2',
    company: 'บริษัท Ai จำกัด',
    location: 'กรุงเทพมหานคร',
    description: 'Web Application PHP, HTML, CSS, JavaScript, Web APIs, SQL, UX/UI...',
    requirements: 'วุฒิการศึกษาระดับปริญญาตรี สาขา Computer Science, Computer Engineering...',
    posted: 'ลงประกาศเมื่อ 30 วันที่ผ่านมา'
  },
  {
    id: 3,
    title: 'Junior Programmer3',
    company: 'บริษัท Ai จำกัด',
    location: 'กรุงเทพมหานคร',
    description: 'Web Application PHP, HTML, CSS, JavaScript, Web APIs, SQL, UX/UI...',
    requirements: 'วุฒิการศึกษาระดับปริญญาตรี สาขา Computer Science, Computer Engineering...',
    posted: 'ลงประกาศเมื่อ 30 วันที่ผ่านมา'
  },
  {
    id: 4,
    title: 'Junior Programmer4',
    company: 'บริษัท Ai จำกัด',
    location: 'กรุงเทพมหานคร',
    description: 'Web Application PHP, HTML, CSS, JavaScript, Web APIs, SQL, UX/UI...',
    requirements: 'วุฒิการศึกษาระดับปริญญาตรี สาขา Computer Science, Computer Engineering...',
    posted: 'ลงประกาศเมื่อ 30 วันที่ผ่านมา'
  },
  {
    id: 5,
    title: 'Junior Programmer5',
    company: 'บริษัท Ai จำกัด',
    location: 'กรุงเทพมหานคร',
    description: 'Web Application PHP, HTML, CSS, JavaScript, Web APIs, SQL, UX/UI...',
    requirements: 'วุฒิการศึกษาระดับปริญญาตรี สาขา Computer Science, Computer Engineering...',
    posted: 'ลงประกาศเมื่อ 30 วันที่ผ่านมา'
  },
  {
    id: 6,
    title: 'Junior Programmer6',
    company: 'บริษัท Ai จำกัด',
    location: 'กรุงเทพมหานคร',
    description: 'Web Application PHP, HTML, CSS, JavaScript, Web APIs, SQL, UX/UI...',
    requirements: 'วุฒิการศึกษาระดับปริญญาตรี สาขา Computer Science, Computer Engineering...',
    posted: 'ลงประกาศเมื่อ 30 วันที่ผ่านมา'
  },
  {
    id: 7,
    title: 'Junior Programmer7',
    company: 'บริษัท Ai จำกัด',
    location: 'กรุงเทพมหานคร',
    description: 'Web Application PHP, HTML, CSS, JavaScript, Web APIs, SQL, UX/UI...',
    requirements: 'วุฒิการศึกษาระดับปริญญาตรี สาขา Computer Science, Computer Engineering...',
    posted: 'ลงประกาศเมื่อ 30 วันที่ผ่านมา'
  }
];

const HrJobPost = () => {
  const jobsPerPage = 6; // จำนวนงานต่อหน้า
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(jobList.length / jobsPerPage));

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

  useEffect(() => {
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
          <div style={{fontSize: '20px',color: 'gray',marginTop: '80px'}}>คุณยังไม่มีโพสต์รับสมัคร สามารถสร้างได้เลยตอนนี้</div>
          <img src="../../../public/PleaseSelectFiled.png" style={imgStyle}/>
        </center>
      ) : (
        <>
          {currentJobs.map(job => (
            <Card key={job.id} className="mb-3" style={cardStyle}>
              <Card.Body>
                <div style={{display: 'flex',justifyContent: 'space-between'}}>
                  <Card.Title>{job.title}</Card.Title>
                  <Button variant="danger">Delete</Button>
                </div>
                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{job.location}</Card.Subtitle>
                <Card.Text>- {job.description}</Card.Text>
                <Card.Text>- {job.requirements}</Card.Text>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Card.Text>{job.posted}</Card.Text>
                  <Link to={'#'}>
                    <Button variant="success">Find candidate</Button>
                  </Link>
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
