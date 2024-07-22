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

const RecommendList = () => {

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

  const [Click , setClick] = useState(false);

  return (
    <Container>
      <Row>
      <Col md={6}>
            {
                <Card style={{ ...borderStyle, height: '600px' }}>
                    <Card.Body>

                    </Card.Body>
                </Card>
            }
            <div className="text-center">
                <p style={TextStyle}>Recommend the job that suits you best
                </p>
            </div>
            <button style={recommendationButtonStyle} onClick={() => { setClick(true);}}>Recommend</button>
        </Col>
    
        {Click ? (
        <Col md={6}>
          {jobList.map(job => (
            <Card key={job.id} className="mb-3" style={cardStyle} >
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{job.location}</Card.Subtitle>
                <Card.Text>{job.description}</Card.Text>
                <Card.Text>{job.requirements}</Card.Text>
                <Card.Text>{job.posted}</Card.Text>
                <Link to={'/JobApplication'}>
                <Button variant="success" style={{ float: 'right' }}>สมัครที่นี่</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </Col>
        ) : (
          <div></div>
        )}

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

const recommendationButtonStyle = {
    backgroundColor: '#D27062',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    margin: '20px auto',
    animation: 'fadeInFromBottom 0.6s ease-in',
};

const TextStyle = {
    color: '#828282',
    fontFamily: 'Trirong',
    fontSize: '18px', 
    fontWeight: 'bold',
    margin: '40px auto',
    animation: 'fadeInFromBottom 0.6s ease-in',
};

const borderStyle = {
    borderRadius: '20px',
    animation: 'fadeInFromBottom 0.6s ease-in',
 };

export default RecommendList;
