import React, { useEffect,useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FaBriefcase, FaUsers } from 'react-icons/fa';



const Resume = () => {
  const StatusCard = ({ title, count, color, icon }) => {
    return (
      <div style={{ ...cardStyle, backgroundColor: color, display: 'flex', alignItems: 'center' }}>
        <div style={iconStyle}>{icon}</div>
        <div style={{ ...contentStyle, flexDirection: 'column', marginLeft: '15px' }}>
          <h4 style={titleStyle}>{title}</h4>
          <p style={countStyle}>{count}</p>
        </div>
      </div>
    );
  };
  
  return (
    <Container>
      <Row>
        <Col md={3}>
          <div className="text-center">
              <p style={TextStyle}> Upload Your Resume
              </p>
          </div>
            <button style={recommendationButtonStyle}>Upload</button>
              <div style={statusContainerStyle}>
                <StatusCard
                  title="My Job"
                  count="3"
                  color="#9d8ee1"
                  icon={<FaBriefcase />}
                />
              </div>
              <div style={statusContainerStyle}>
                <StatusCard
                  title="Interview"
                  count="2"
                  color="#2ecc71"
                  icon={<FaUsers />}
                />
              </div>
        </Col>
        <Col md={1}>
        </Col>
        <Col md={8}>
          {
            <Card style={{ ...borderStyle, height: '550px' }}>
              <Card.Body>

              </Card.Body>
            </Card>
          }
        </Col>

      </Row>
    </Container>
  );
};

 const borderStyle = {
    borderRadius: '20px',

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
    padding: '20px 60px',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    display: 'block',
    margin: '20px auto',
    marginBottom: '60px',
    alignItems: 'center', 
  };

const TextStyle = {
    color: '#828282',
    fontFamily: 'Trirong',
    fontSize: '18px', 
    fontWeight: 'bold',
    margin: '40px auto',
};

const statusContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Adjust the min-width as needed
  gap: '30px', // Adjust the gap as needed
  alignItems: 'center',
  marginBottom: '30px',
};


const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '10px',
  padding: '15px',
  color: '#fff',
  fontFamily: 'Trirong',
};

const iconStyle = {
  fontSize: '24px',
  marginRight: '15px',
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle = {
  margin: 0,
  fontSize: '18px',
  fontWeight: 'normal',
};

const countStyle = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 'bold',
};

const purpleBoxStyle = {
  width: '200px', // Set the desired width for the purple box
  backgroundColor: '#9d8ee1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  padding: '15px',
  color: '#fff',
  fontFamily: 'Trirong',
};

const greenBoxStyle = {
  width: '200px', // Set the desired width for the green box
  backgroundColor: '#2ecc71',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  padding: '15px',
  color: '#fff',
  fontFamily: 'Trirong',
};


export default Resume;
