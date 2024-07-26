import React, { useEffect, useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'
import {FaBriefcase, FaUsers } from 'react-icons/fa';
import StatusCard from '../StatusCard';

const Resume = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [Alert,setAlert] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem('id_user'));
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
    if (userId) {
        checkResume();
    }
}, [userId]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const checkResume = async () =>{
    const response = await axios.post('http://localhost:4001/checkValidResume',{
      id_user: userId
    });
    if(response.status == 200){
      setImage(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('id', userId);
    if(!selectedFile){
      setError('กรุณาเลือก Resume ของคุณ');
      setAlert(null); 
      return
    };
    try{
      const response = await axios.post('http://localhost:4001/uploadPDF', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
      if(response.status == 200){
        setError(null);
        setAlert('Upload Done');
        setTimeout(() => {
          window.location.reload();
      }, 1000);
      }
  } catch(err){
        console.error(err);
      }
  }
  
  return (
    <Container>
      <Row>
        <Col md={3}>
          <div className="text-center">
              <p style={TextStyle}> Upload Your Resume</p>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              {Alert && <div className="alert alert-success" role="alert">{Alert}</div>}
          </div>
            <div style={inputStyle}>
            <input type="file" className="form-control" onChange={handleFileChange} />
            <div style={{width: '20px'}}></div>
            <button style={recommendationButtonStyle} type='submit' onClick={handleSubmit} >Upload</button>
            </div>
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
            <div style={{ ...borderStyle}}>
              {image ? (
                <center style={PDFStyle}>
                <img src={`../../../public/Resume/${userId}-1.jpg`} width={556} height={787}/>
                </center>
              ):(
                <div></div>
              )}
            </div>
          }
        </Col>

      </Row>
    </Container>
  );
};

 const borderStyle = {
    height: '800px', 
    borderRadius: '20px',
    animation: 'fadeInFromBottom 0.6s ease-in',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
 };

 const PDFStyle = {
  padding: '10px',
  animation: 'fadeInFromBottom 0.6s ease-in',
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
    height: '40px',
    backgroundColor: '#D27062',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    display: 'block',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
  };

const inputStyle = {
  display: 'flex',
  marginBottom: '50px'
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

export default Resume;
