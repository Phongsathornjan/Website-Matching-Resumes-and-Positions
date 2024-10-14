import React from "react";
import HRNavbar from "../components/navbar/HRNavbar.jsx";
import { useParams } from "react-router-dom";

function ResumePage() {
  const { userId } = useParams();

  return (
    <>
      <HRNavbar></HRNavbar>
      <div style={{height: "100px"}}></div>
      <center>
        <div style={borderStyle}>
          <center style={PDFStyle}>
            <img
              src={`../../public/Resume/${userId}-1.jpg`}
              width={556}
              height={787}
            />
          </center>
        </div>
      </center>
    </>
  );
}

const borderStyle = {
    marginRight: '200px',
    marginLeft: '200px',
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

export default ResumePage;
