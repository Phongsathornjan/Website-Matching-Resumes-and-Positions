import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import getMatchColor from './getMatchColor';


const jobList = [
  {
    title: 'Junior Programmer1',
    company: 'บริษัท Ai จำกัด',
    location: 'กรุงเทพมหานคร',
    description: 'Web Application PHP, HTML, CSS, JavaScript, Web APIs, SQL, UX/UI...',
    requirements: 'วุฒิการศึกษาระดับปริญญาตรี สาขา Computer Science, Computer Engineering...',
    postedDays: 15, 
    matchPercentage: 92,
  },
  {
    title: 'Junior Programmer2',
    company: 'บริษัท Ai จำกัด',
    location: 'กรุงเทพมหานคร',
    description: 'Web Application PHP, HTML, CSS, JavaScript, Web APIs, SQL, UX/UI...',
    requirements: 'วุฒิการศึกษาระดับปริญญาตรี สาขา Computer Science, Computer Engineering...',
    postedDays: 2,
    matchPercentage: 82,
  },
  {
    title: 'Junior Programmer3',
    company: 'บริษัท Ai จำกัด',
    location: 'กรุงเทพมหานคร',
    description: 'Web Application PHP, HTML, CSS, JavaScript, Web APIs, SQL, UX/UI...',
    requirements: 'วุฒิการศึกษาระดับปริญญาตรี สาขา Computer Science, Computer Engineering...',
    postedDays: 10,
    matchPercentage: 60,
  },
];

const MatchCompanyList = () => {
  const [selectedJob, setSelectedJob] = useState(jobList[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleJobClick = (job) => {
    setIsAnimating(true);
    setSelectedJob(null);
    setTimeout(() => {
      setSelectedJob(job);
      setIsAnimating(false);
    }, 300); 
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          {jobList.map((job) => (
            <Card
              className={`mb-3 ${isAnimating ? 'fade-in-from-bottom' : ''}`} 
              style={cardStyle}
              onClick={() => handleJobClick(job)}
            >
              <Card.Body style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span style={{ ...matchStyle, backgroundColor: getMatchColor(job.matchPercentage),boxShadow: `0 4px 15px ${getMatchColor(job.matchPercentage)}` }}>
                  Match {job.matchPercentage}%
                </span>
                <div>
                  <Card.Title style={titleStyle}>{job.title}</Card.Title>
                  <Card.Subtitle style={companyStyle}>
                    {job.company}
                  </Card.Subtitle>
                  <Card.Subtitle style={locationStyle}>
                    {job.location}
                  </Card.Subtitle>
                  <div style={descriptionStyle}>
                    <ul>
                      <li>{job.description}</li>
                      <li>{job.requirements}</li>
                    </ul>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Card.Text style={postedTextStyle}>
                    ลงประกาศเมื่อ {job.postedDays} วันที่ผ่านมา
                  </Card.Text>
                  <Link to={'/userJobApplication'}>
                    <Button variant="success" style={applyButtonStyle}>
                      สมัครที่นี่
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={6}>
          {selectedJob ? (
            <Card className={`h-75 ${isAnimating ? 'fade-in-from-bottom' : ''}`} style={cardStyle}>
              <Card.Body>
                <Card.Title>{selectedJob.title}</Card.Title>
                <Card.Text>{selectedJob.description}</Card.Text>
                <Card.Text>{selectedJob.requirements}</Card.Text>
                <Card.Text>ลงประกาศเมื่อ {selectedJob.postedDays} วันที่ผ่านมา</Card.Text>
                <div style={{ height: '410px' }}></div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link to={'/userJobApplication'}>
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
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  marginBottom: '15px',
  position: 'relative',
  backgroundColor: '#fff',
  animation: 'fadeInFromBottom 0.3s ease-in',
};

const titleStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333',
  marginTop: '15px', 
  marginBottom: '15px', 
};

const companyStyle = {
  fontSize: '16px',
  color: '#6c757d',
  marginBottom: '10px',
};

const locationStyle = {
  fontSize: '14px',
  color: '#6c757d',
  marginBottom: '10px',
};

const descriptionStyle = {
  fontSize: '14px',
  color: '#333',
  marginBottom: '15px',
};

const postedTextStyle = {
  fontSize: '12px',
  color: '#999',
  alignSelf: 'flex-start',
};

const applyButtonStyle = {
  padding: '8px 20px',
  fontSize: '14px',
};

const matchStyle = {
  color: '#fff',
  padding: '8px 15px',
  borderRadius: '20px',
  fontSize: '16px',
  position: 'absolute',
  top: '15px',
  right: '15px',
  fontWeight: 'bold',
};

export default MatchCompanyList;
