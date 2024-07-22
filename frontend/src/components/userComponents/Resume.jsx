import React, { useEffect} from 'react';
import { Card , Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FaBriefcase, FaUsers } from 'react-icons/fa';
import StatusCard from '../StatusCard';



const Resume = () => {

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
            <Card style={{ ...borderStyle, height: '700px' }}>
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
    animation: 'fadeInFromBottom 0.6s ease-in',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
 };

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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
  gap: '30px', 
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
