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
  }
];

const HrJobPost = () => {

  useEffect(() => {
    //add animation
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyle;
    document.head.appendChild(styleSheet);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const [selectedJob, setSelectedJob] = useState(null);
  
    return (
        <div>
          {jobList.map(job => (
            <Card key={job.id} className="mb-3" style={cardStyle} onClick={() => {setSelectedJob(null); setTimeout(() => setSelectedJob(job), 0);}}>
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{job.location}</Card.Subtitle>
                <Card.Text>- {job.description}</Card.Text>
                <Card.Text>- {job.requirements}</Card.Text>
                <div style={{display: 'flex',justifyContent: 'space-between'}}>
                  <Card.Text>{job.posted}</Card.Text>
                  <Link to={'#'}>
                    <Button variant="success">รายละเอียด</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
    );
  };


const cardStyle = {
  width: '1000px',
  borderRadius: '20px',
  animation: 'fadeInFromBottom 0.6s ease-in',

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
}`;

export default HrJobPost
