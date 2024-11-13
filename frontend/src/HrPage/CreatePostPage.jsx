import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Form } from "react-bootstrap";
import swal from "sweetalert";

import JobFieldOptions from "../components/Data/jobField";
import LocationOptions from "../components/LocationOptions";
import HRNavbar from "../components/navbar/HRNavbar.jsx";

const CreatePostPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function authentication() {
      try {
        let token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:4001/auth",
          {},
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        if (response.status == 200) {
          if (response.data.userData.role != "hr") {
            navigate("/SignIn");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    authentication();

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyle;
    document.head.appendChild(styleSheet);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(null);

  const [Position, setPosition] = useState(null);
  const [Salary, setSalary] = useState(null);
  const [WorkField, setWorkField] = useState(null);
  const [Location, setLocation] = useState(null);
  const [JobDescription, setJobDescription] = useState(null);
  const [Qualifications, setQualifications] = useState(null);
  const [Experience, setExperience] = useState(null);

  const handleButton = async () => {
    const userId = localStorage.getItem("id_user");
    if (!userId) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:4001/createPost", {
        userId: userId,
        Position: Position,
        Salary: Salary,
        WorkField: WorkField,
        Location: Location,
        JobDescription: JobDescription,
        Qualifications: Qualifications,
        Experience: Experience,
      });
      if (response.status == 200) {
        setIsLoading(false);
        swal({
          title: "OK!",
          text: "สร้าง Post เรียบร้อย",
          icon: "success",
        }).then(() => {
          navigate("/HrIndexPage");
        });
      }
    } catch (err) {
      if (err.response.status == 400) {
        swal(
          "Oops!",
          `เกิดข้อผิดพลาด Error : ${err.response.data.message}`,
          "error"
        );
      }
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <HRNavbar></HRNavbar>
      <div style={createPostStyle}>
        <h1 style={titleStyle}>Create Post</h1>
        <div>
          {isLoading && (
            <center>
              <div style={spinnerStyle}></div>
            </center>
          )}
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              justifyContent: "space-between",
            }}
          >
            <Form.Control
              placeholder="Position"
              style={{ width: "400px" }}
              onChange={(e) => setPosition(e.target.value)}
            />
            <Form.Control
              placeholder="Salary"
              style={{ width: "400px" }}
              onChange={(e) => setSalary(e.target.value)}
            />
            <div style={{ width: "240px" }}>
              <Select
                options={LocationOptions}
                placeholder="พื้นที่ทำงาน"
                styles={{ width: "100%" }}
                onChange={(e) => setLocation(e.value)}
              />
            </div>
            <div style={{ width: "240px" }}>
              <Select
                options={JobFieldOptions}
                placeholder="สายอาชีพ"
                styles={{ width: "100%" }}
                onChange={(e) => setWorkField(e.value)}
              />
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <p>&nbsp;JobDescription</p>
            <Form.Control
              as="textarea"
              style={{ width: "100%", height: "150px" }}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <p>&nbsp;Qualifications / Requirement</p>
            <Form.Control
              as="textarea"
              style={{ width: "100%", height: "150px" }}
              onChange={(e) => setQualifications(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <p>&nbsp;Experience</p>
            <Form.Control
              as="textarea"
              style={{ width: "100%", height: "150px" }}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <button type="submit" style={styles.button} onClick={handleButton}>
            สร้างโพสต์
          </button>
        </div>
      </div>
    </>
  );
};

const createPostStyle = {
  marginLeft: "20px",
  marginTop: "90px",
  marginRight: "20px",
  animation: "fadeInFromBottom 0.5s ease-in",
};

const styles = {
  input: {
    padding: "12px",
    fontSize: "16px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#4683d9",
    color: "white",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const titleStyle = {
  color: "#3769B4",
  fontFamily: "Trirong",
  fontSize: "48px", // Adjusted to match the image size
  fontWeight: "bold",
  marginBottom: "30px",
  marginRight: "100px",
};

const spinnerStyle = {
  border: '4px solid rgba(0, 0, 0, 0.1)',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  borderLeftColor: '#09f',
  animation: 'spin 1s ease infinite',
  marginBottom: '30px'
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
  
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

`;

export default CreatePostPage;
