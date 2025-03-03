import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

const Resume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem("id_user"));
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

  const checkResume = async () => {
    try {
      const response = await fetch(`/Resume/${userId}-1.jpg`);
      if (response.ok && response.headers.get('content-type')?.includes('image')) {
        setImage(true);
      } else {
        setImage(false);
      }
    } catch (error) {
      setImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("id", userId);

    if (!selectedFile) {
      swal("Oops!", "กรุณาเลือก Resume ของคุณ", "error");
      return;
    }

    if (selectedFile.type != "application/pdf") {
      swal("Oops!", "กรุณาเลือกไฟล์ PDF", "error");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4001/uploadPDF",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        swal({
          title: "OK!",
          text: "อัพโหลด Resume เรียบร้อย",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={3}>
          <div className="text-center">
            <p style={TextStyle}> Upload Your Resume</p>
            {isLoading && (
              <center>
                <div style={spinnerStyle}></div>
              </center>
            )}
          </div>
          <div style={inputStyle}>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
            <div style={{ width: "20px" }}></div>
            <button
              style={recommendationButtonStyle}
              type="submit"
              onClick={handleSubmit}
            >
              Upload
            </button>
          </div>
        </Col>
        <Col md={1}></Col>
        <Col md={8}>
          {
            <div style={{ ...borderStyle }}>
              {image ? (
                <center style={PDFStyle}>
                  <img
                    src={`/Resume/${userId}-1.jpg`}
                    width={556}
                    height={787}
                  />
                </center>
              ) : (
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
  height: "800px",
  borderRadius: "20px",
  animation: "fadeInFromBottom 0.6s ease-in",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
};

const PDFStyle = {
  padding: "10px",
  animation: "fadeInFromBottom 0.6s ease-in",
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

`;

const recommendationButtonStyle = {
  height: "40px",
  backgroundColor: "#D27062",
  color: "white",
  border: "none",
  borderRadius: "15px",
  cursor: "pointer",
  display: "block",
  alignItems: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
};

const inputStyle = {
  display: "flex",
  marginBottom: "50px",
};

const TextStyle = {
  color: "#828282",
  fontFamily: "Trirong",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "40px auto",
};

const spinnerStyle = {
  border: "4px solid rgba(0, 0, 0, 0.1)",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  borderLeftColor: "#09f",
  animation: "spin 1s ease infinite",
  marginBottom: "30px",
};

export default Resume;
