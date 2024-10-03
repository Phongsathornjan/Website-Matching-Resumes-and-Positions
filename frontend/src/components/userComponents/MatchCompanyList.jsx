import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import getMatchColor from "./getMatchColor";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";

const MatchCompanyList = () => {
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const [jobList, setJobList] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [userLocation, setUserLocation] = useState(null);
  const [jobField, setJobField] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getMostMatchPost();
  }, [userLocation, jobField]);

  const getMostMatchPost = async () => {
    if (userLocation != null && jobField != null) {
      const encodedLocation = encodeURIComponent(userLocation);
      const encodedJobField = encodeURIComponent(jobField);
      const userId = localStorage.getItem("id_user");
      try {
        const response = await axios.get(
          `http://localhost:4001/getMostMatchPost/${encodedLocation}/${encodedJobField}/${userId}`
        );
        if (response.status == 200) {
          setJobList(response.data);
        } else if (response.status == 204) {
          setNotFound(true);
        }
      } catch (err) {
        console.log(err);
        swal("Oops!", "Internal Server Error", "error");
      }
    }
  };

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          `http://localhost:4001/tokenDecoder/${token}`
        );
        setUserLocation(response.data.userData.location);
        setJobField(response.data.userData.jobField);
      } catch (err) {
        console.log(err);
        swal("Oops!", "Internal Server Error", "error");
      }
    } else {
      swal({
        title: "Oops!",
        text: "คุณยังไม่ได้เข้าสู่ระบบ",
        icon: "error",
      }).then(() => {
        navigate("/SignIn");
      });
    }
  };

  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJobId(job._id); 
    setIsAnimating(true);
    setSelectedJob(null);
    setTimeout(() => {
      setSelectedJob(job);
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(jobList.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = jobList.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Container>
      <Row>
        <Col md={6}>
          {currentPosts.map((job) => (
            <Card
              key={job._id}
              className={`mb-4 ${isAnimating ? "fade-in-from-bottom" : ""}`}
              style={{
                ...cardStyle,
                boxShadow: `0 0px 10px ${selectedJobId === job._id ? getMatchColor(job.matchPercentage) : "white"}`
              }}
              onClick={() => handleJobClick(job)}
            >
              <span
                style={{
                  ...matchStyle,
                  backgroundColor: getMatchColor(job.matchPercentage),
                  boxShadow: `0 4px 15px ${getMatchColor(job.matchPercentage)}`,
                }}
              >
                Match {job.matchPercentage}%
              </span>
              <Card.Body>
                <Card.Title style={titleStyle}>{job.Position}</Card.Title>
                <Card.Subtitle style={locationStyle}>{job.Location}</Card.Subtitle>
                <Card.Subtitle style={companyStyle}>เงินเดือน : {job.Salary}</Card.Subtitle>
                <Card.Text style={ellipsisStyle}>
                  <span style={{ fontWeight: "bold", color: "#3F4447" }}>
                    JobDescription :
                  </span>{" "}
                  {job.JobDescription}
                </Card.Text>
                <Card.Text>โพสต์เมื่อ : {moment(Number(job.time_stamp)).format("DD-MM-YYYY")}</Card.Text>
              </Card.Body>
            </Card>
          ))}
          {notFound && (
            <div style={{ marginTop: "10px" }}>
              <div>
                <img
                  src="../../public/PleaseSelectFiled.png"
                  style={{ width: "300px" }}
                />
              </div>
              <div style={{ height: "50px" }}></div>
              <span style={{ color: "#6c757d", fontSize: "24px", marginLeft: "30px" }}>
                ไม่เจอโพสต์ที่ Match กับคุณ
              </span>
            </div>
          )}
        </Col>

        <Col md={6} style={{ position: "sticky", top: "80px", height: "fit-content" }}>
          {selectedJob ? (
            <Card style={{...selectCardStyle,boxShadow: `0 0px 10px ${getMatchColor(selectedJob.matchPercentage)}`,}}>
              <Card.Body>
                <Card.Title>{selectedJob.Position}</Card.Title>
                <Card.Subtitle style={locationStyle}>
                  {selectedJob.Location}
                </Card.Subtitle>
                <Card.Subtitle style={companyStyle}>
                  เงินเดือน : {selectedJob.Salary}
                </Card.Subtitle>
                <Card.Text>
                  <span style={{ fontWeight: "bold", color: "#3F4447" }}>
                    JobDescription :
                  </span>{" "}
                  {selectedJob.JobDescription}
                </Card.Text>
                <Card.Text>โพสต์เมื่อ : {moment(Number(selectedJob.time_stamp)).format("DD-MM-YYYY")}</Card.Text>
                <Link to={`/userJobApplication?idPost=${selectedJob._id}`}>
                  <Button variant="success">รายละเอียดเพิ่มเติม</Button>
                </Link>
              </Card.Body>
            </Card>
          ) : (
            <div style={{ textAlign: "center", paddingTop: "50%" }}>
              <span style={{ color: "#6c757d", fontSize: "24px" }}>
                กรุณาเลือกงาน...
              </span>
            </div>
          )}
        </Col>
      </Row>

      <div style={SlideNavigation}>
        <button
          style={NavigationButton}
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span>Page {currentPage} of {Math.ceil(jobList.length / postsPerPage)}</span>
        <button
          style={NavigationButton}
          onClick={handleNext}
          disabled={currentPage === Math.ceil(jobList.length / postsPerPage)}
        >
          {">"}
        </button>
      </div>
    </Container>
  );
};


const NavigationButton = {
  backgroundColor: "#fff",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
  border: "none",
  margin: "0 10px",
  position: "relative",
};

const SlideNavigation = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
  position: "relative",
};


const cardStyle = {
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "15px",
  position: "relative",
  backgroundColor: "#fff",
  animation: "fadeInFromBottom 0.3s ease-in",
};

const selectCardStyle = {
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "15px",
  position: "relative",
  animation: "fadeInFromBottom 0.3s ease-in",
};

const titleStyle = {
  fontWeight: "bold",
  color: "#333",
  marginTop: "15px",
  marginBottom: "15px",
};

const companyStyle = {
  color: "#6c757d",
  marginBottom: "10px",
};

const locationStyle = {
  color: "#6c757d",
  marginBottom: "10px",
};

const matchStyle = {
  color: "#fff",
  padding: "8px 15px",
  borderRadius: "20px",
  fontSize: "16px",
  position: "absolute",
  top: "15px",
  right: "15px",
  fontWeight: "bold",
};

const ellipsisStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default MatchCompanyList;
