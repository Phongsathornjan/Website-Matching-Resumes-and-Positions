import React, { useEffect,useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import { JobListUserContext } from "../../context/JobListUserContext"

const userCompanyList = () => {

  const [jobList, setJobList] = React.useContext(JobListUserContext);

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

  useEffect(() => {
    setSelectedJob(null)
  }, [jobList]);

  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <>
    {jobList.length == 0 ? (
      <center style={fade}>
        <div>
          <img src="../../public/PleaseSelectFiled.png" style={{ marginTop: '60px',width: '400px' }} />
        </div>
        <div style={{ marginTop: '20px' }}>
          <span style={{ color: '#828282', fontSize: '48px' }}>ไม่เจอผลลัพธ์</span>
        </div>
      </center>
    ):(
      <Container>
      <Row>
        <Col md={6}>
          {jobList.map(job => (
            <Card key={job._id} className="mb-3" style={cardStyle} onClick={() => {setSelectedJob(null); setTimeout(() => setSelectedJob(job), 0);}}>
              <Card.Body>
                <Card.Title>{job.Position}</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle> */}
                <Card.Subtitle className="mb-2 text-muted">{job.Location}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">เงินเดือน : {job.Salary}</Card.Subtitle>
                <Card.Text style={ellipsisStyle}><span style={{fontWeight: 'bold', color: '#3F4447'}}>JobDescription :</span> {job.JobDescription}</Card.Text>
                <Card.Text style={ellipsisStyle}><span style={{fontWeight: 'bold', color: '#3F4447'}}>Qualifications : </span>{job.Qualifications}</Card.Text>
                <Card.Text style={ellipsisStyle}><span style={{fontWeight: 'bold', color: '#3F4447'}}>Experience : </span>{job.Experience}</Card.Text>
                <Card.Text>โพสต์เมื่อ : {job.time_stamp}</Card.Text>
                <Button variant="primary">รายละเอียด</Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={6}>
          {selectedJob ? (
            <Card style={cardStyle}>
              <Card.Body>
                <Card.Title>{selectedJob.Position}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{selectedJob.Location}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">เงินเดือน : {selectedJob.Salary}</Card.Subtitle>
                <Card.Text><span style={{fontWeight: 'bold', color: '#3F4447'}}>JobDescription :</span> {selectedJob.JobDescription}</Card.Text>
                <Card.Text><span style={{fontWeight: 'bold', color: '#3F4447'}}>Qualifications :</span> {selectedJob.Qualifications}</Card.Text>
                <Card.Text><span style={{fontWeight: 'bold', color: '#3F4447'}}>Experience : </span> {selectedJob.Experience}</Card.Text>
                <Card.Text>{selectedJob.time_stamp}</Card.Text>
                <div style={{display: 'flex'}}>
                <div style={{width: '500px'}}></div>
                <Link to={`/userJobApplication?idPost=${selectedJob._id}`}>
                  <Button variant="success">รายละเอียด</Button>
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
    )}
    </>
  );
};

const ellipsisStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',        
  textOverflow: 'ellipsis', 
};

 const cardStyle = {
    borderRadius: '20px',
    animation: 'fadeInFromBottom 0.6s ease-in',

 };

 const fade = {
    animation: 'fadeInFromBottom 0.6s ease-in',
 }

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

export default userCompanyList;
