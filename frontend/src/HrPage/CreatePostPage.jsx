import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormField from '../components/FormField.jsx';
import HRNavbar from '../components/navbar/HRNavbar.jsx';

const CreatePostPage = () => {

  useEffect(() => {
    async function authentication() {
      try{
        let token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:4001/auth', {} ,{
          headers: {
            'x-access-token': token
          }
        })

        if(response.status == 200){
          if(!response.data.userData.role == "admin"){
            navigate('/SignIn');
          }
        }else{
          navigate('/SignIn');
        }

      } catch(err){
        navigate('/SignIn');
      }
    }
   
    authentication();
  }, []);

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

  const [topic, setTopic] = useState('');
  const [salary, setSalary] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleButton = async () => {
    setError(null);
    const userId = localStorage.getItem('id_user');
    if(!userId){return}
    try{
      const response = await axios.post('http://localhost:4001/createPost',{
        userId: userId,
        topic: topic,
        company: company,
        position: position,
        salary: salary,
        location: location,
        description: description,
      });
      setSuccess('Create Post Success. Refreshing...');
    }catch(err){
      if(err.response.status == 400){
        setError(err.response.data.message);
      }
      console.log(err);
    }
  }

  return (
    <>
    <HRNavbar></HRNavbar>
      <div style={{margin: '40px',marginTop: '100px'}}>
      <h1 style={titleStyle}>Create Post</h1>
      {error ? ( <div className="alert alert-danger" role="alert" style={{animation: 'fadeInFromBottom 0.2s ease-in'}}>{error}</div> 
      ): success ? (
        <div className="alert alert-success" role="alert" style={{animation: 'fadeInFromBottom 0.2s ease-in'}}>{success}</div> 
      ):(
        <div style={{height: '74px'}}></div>
      )}
      <div style={formStyle}>
          <FormField label="Topic" type="text" placeholder="Enter the topic" onChange={(e) => setTopic(e.target.value)}/>
        <div style={formRowStyle}>
          <FormField label="Position" type="text" placeholder="Enter the position" onChange={(e) => setPosition(e.target.value)}/>
          <FormField label="Salary" type="text" placeholder="Enter the salary" onChange={(e) => setSalary(e.target.value)}/>
        </div>
        <div style={formRowStyle}>
          <FormField label="Company" type="text" placeholder="Enter the company name" onChange={(e) => setCompany(e.target.value)}/>
          <FormField label="Location" type="text" placeholder="Enter the location" onChange={(e) => setLocation(e.target.value)}/>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Description</label>
          <textarea placeholder="Enter a description" style={textareaStyle} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <button type="submit" style={buttonStyle} onClick={handleButton}>Create Post</button>
      </div>
      </div>
    </>
  );
};

const titleStyle = {
  color: '#3769B4',
  fontFamily: 'Trirong',
  fontSize: '48px', // Adjusted to match the image size
  fontWeight: 'bold',
  marginBottom: '30px',
};

const formStyle = {
  display: 'grid',
  gap: '20px',
};

const formRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#333',
  fontSize: '16px',
  fontFamily: 'Trirong',
};

const textareaStyle = {
  width: '100%',
  height: '150px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontFamily: 'Trirong',
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#3769B4',
  color: 'white',
  border: 'none',
  fontFamily: 'Trirong',
  cursor: 'pointer',
};

const contactHeadStyle = {
  marginTop: '20px',
  fontFamily: 'Trirong',
  fontSize: '22px',
};

const contactInfoStyle = {
  marginTop: '5px',
  fontFamily: 'Trirong',
  fontSize: '16px',
  color: 'gray',
};

const socialLinksStyle = {
  display: 'flex',
  gap: '25px', 
  marginTop: '15px',
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

export default CreatePostPage;
