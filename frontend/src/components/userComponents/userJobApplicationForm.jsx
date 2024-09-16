import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const jobData = {
  company: {
    name: "OpenAi.co.th",
    address: "Bangkok",
  },
  requirements: [
    "- Develop integration application to meet business requirements...",
    "- Compose design documents, diagram, user manual.",
    "- Support users testing."
  ],
  qualifications: [
    "- Bachelor's degree or higher in Computer Engineering, Computer Sciences, IT, or related field.",
    "- At least 1 year experience as a Java Developer (Fresh Graduate with proven technical knowledge are welcome).",
    "- Good knowledge in computer programming language.",
    "- Knowledge of Relational Databases (SQL/PSQL).",
    "- Strong problem-solving and logical reasoning skills.",
    "- Good communication and interpersonal skill (English would be advantage).",
    "- Proactive, self-motivated, systematic thinking, fast learner and positive attitude in teamwork.",
  ],
  advantages: [
    "- Good understanding of Web Services (SOAP, REST) and message formats (JSON, XML, YAML).",
    "- Java Framework (Spring Boot, Camel).",
    "- Knowledge of Unit Testing.",
    "- MQ technology (RabbitMQ, IBM MQ).",
    "- Streaming technology (Kafka, Pulsar).",
    "- Schema design (WSDL, OpenAPI, Apache Daffodil).",
    "- CI/CD (Source control, build/test/deployment automation)."
  ],
  location: "currently Hybrid at 1. Silom Head office 2. Rama 9"
};

const userJobApplicationForm = () => {

  useEffect(() => {
    window.scrollTo(0,0);
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
    <div className="container" style={Fade}>
      <section className="mb-5 w-75">
        <h5>About company</h5>
        <div className="card p-3 mb-3 mt-3">
          <p><strong>{jobData.company.name}</strong></p>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p>Address : {jobData.company.address}</p>
            <Link to={'#'}>
            <button className="btn btn-primary">More detail</button>
            </Link>
          </div>
        </div>
      </section>
      <section className="mb-5 w-75">
        <h5>Full Descriptions</h5>
        <div className='card mt-3 p-4'>
        <h5>Requirements:</h5>
          <div className='mt-1'>
            {jobData.requirements.map((item, index) => (
              <p key={index} className="">{item}</p>
            ))}
          </div>
        <h5>Qualifications:</h5>
          <div className='mt-1'>
            {jobData.qualifications.map((item, index) => (
              <p key={index} className="list-group-item">{item}</p>
            ))}
          </div>
        <h5>Experience in one or more of the following will be an advantage:</h5>
        <div className="mb-1">
          {jobData.advantages.map((item, index) => (
            <p key={index} className="list-group-item">{item}</p>
          ))}
        </div>
        <h5>Working</h5>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <p className="mb-1">Working Location: {jobData.location}</p>
          <Link to={'#'}>
            <button className="btn btn-success">Apply</button>
          </Link>
        </div>
        </div>
      </section>
    </div>
  );
};

const Fade = {
  animation: 'fadeInFromBottom 1s ease-in',
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

body {
  margin: 0;
  font-family: 'Trirong', sans-serif;
}
`;

export default userJobApplicationForm;
