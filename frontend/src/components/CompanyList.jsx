import React, { useEffect,useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
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
  }
];

const CompanyList = () => {

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

  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <Container>
      <Row>
        <Col md={6}>
          {jobList.map(job => (
            <Card key={job.id} className="mb-3" style={cardStyle} onClick={() => {setSelectedJob(null); setTimeout(() => setSelectedJob(job), 0);}}>
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{job.location}</Card.Subtitle>
                <Card.Text>{job.description}</Card.Text>
                <Card.Text>{job.requirements}</Card.Text>
                <Card.Text>{job.posted}</Card.Text>
                <Button variant="primary">รายละเอียด</Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={6}>
          {selectedJob ? (
            <Card style={cardStyle} className='h-75' >
              <Card.Body>
                <Card.Title>{selectedJob.title}</Card.Title>
                <Card.Text>{selectedJob.description}</Card.Text>
                <Card.Text>{selectedJob.requirements}</Card.Text>
                <Card.Text>{selectedJob.posted}</Card.Text>
                <div style={{height: '410px'}}></div>
                <div style={{display: 'flex'}}>
                <div style={{width: '500px'}}></div>
                <Link to={'/JobApplication'}>
                <Button variant="success">สมัครที่นี่</Button>
                </Link>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: '50%' }}>
              <span style={{ color: '#6c757d', fontSize: '24px' }}>กรุณาเลือกงาน...</span>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

 const cardStyle = {
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
}

`;

export default CompanyList;
