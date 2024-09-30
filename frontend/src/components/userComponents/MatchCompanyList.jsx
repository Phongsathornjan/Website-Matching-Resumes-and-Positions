import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import getMatchColor from "./getMatchColor";
import axios from "axios";

import moment from "moment";
import swal from "sweetalert";

const MatchCompanyList = () => {
  const navigate = useNavigate();

  const [jobList, setJobList] = useState([]);
  const [selectedJob, setSelectedJob] = useState(jobList[0]);
  const [isAnimating, setIsAnimating] = useState(false);

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
        setJobList(response.data);
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

  const handleJobClick = (job) => {
    setIsAnimating(true);
    setSelectedJob(null);
    setTimeout(() => {
      setSelectedJob(job);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          {jobList.map((job) => (
            <Card
              key={job._id}
              className={`mb-3 ${isAnimating ? "fade-in-from-bottom" : ""}`}
              style={cardStyle}
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
              <Card.Body
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Card.Title style={titleStyle}>{job.Position}</Card.Title>
                  <Card.Subtitle style={locationStyle}>
                    {job.Location}
                  </Card.Subtitle>
                  <Card.Subtitle style={companyStyle}>
                    เงินเดือน : {job.Salary}
                  </Card.Subtitle>
                  <div style={descriptionStyle}>
                    <div style={ellipsisStyle}>
                      <span style={{ fontWeight: "bold", color: "#3F4447" }}>
                        JobDescription :
                      </span>{" "}
                      {job.JobDescription}
                    </div>
                    <div style={ellipsisStyle}>
                      <span style={{ fontWeight: "bold", color: "#3F4447" }}>
                        Qualifications :
                      </span>{" "}
                      {job.Qualifications}
                    </div>
                    <div style={ellipsisStyle}>
                      <span style={{ fontWeight: "bold", color: "#3F4447" }}>
                        Experience :
                      </span>{" "}
                      {job.Experience}
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Card.Text style={postedTextStyle}>
                    โพสต์เมื่อ :{" "}
                    {moment(Number(job.time_stamp)).format("DD-MM-YYYY")}
                  </Card.Text>
                  <Button variant="success" style={applyButtonStyle}>
                    รายละเอียด
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col
          md={6}
          style={{ position: "sticky", top: "80px", height: "fit-content" }}
        >
          {selectedJob ? (
            <Card
              className={`h-25 ${isAnimating ? "fade-in-from-bottom" : ""}`}
              style={{ ...cardStyle, overflow: "hidden" }}
            >
              <Card.Body style={{ maxHeight: "685px", overflowY: "hidden" }}>
                <Card.Title>{selectedJob.Position}</Card.Title>
                <Card.Subtitle style={locationStyle}>
                  {selectedJob.Location}
                </Card.Subtitle>
                <Card.Subtitle style={companyStyle}>
                  เงินเดือน : {selectedJob.Salary}
                </Card.Subtitle>

                <Card.Text>
                  <span style={{ fontWeight: "bold", color: "#3F4447" }}>
                    JobDescription : <br />
                  </span>

                  {selectedJob.JobDescription.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </Card.Text>

                <Card.Text>
                  <span style={{ fontWeight: "bold", color: "#3F4447" }}>
                    Qualifications : <br />
                  </span>
                  {selectedJob.Qualifications.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </Card.Text>

                <Card.Text>
                  <span style={{ fontWeight: "bold", color: "#3F4447" }}>
                    Experience : <br />
                  </span>
                  {selectedJob.Experience.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </Card.Text>

                <Card.Text>
                  โพสต์เมื่อ :{" "}
                  {moment(Number(selectedJob.time_stamp)).format("DD-MM-YYYY")}
                </Card.Text>
              </Card.Body>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <Link to={`/userJobApplication?idPost=${selectedJob._id}`}>
                  <Button variant="success">รายละเอียดเพิ่มเติม</Button>
                </Link>
              </div>
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
    </Container>
  );
};

const cardStyle = {
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  marginBottom: "15px",
  position: "relative",
  backgroundColor: "#fff",
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

const descriptionStyle = {
  color: "#333",
  marginBottom: "15px",
};

const postedTextStyle = {
  color: "#999",
  alignSelf: "flex-start",
};

const applyButtonStyle = {
  padding: "8px 20px",
  fontSize: "14px",
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
