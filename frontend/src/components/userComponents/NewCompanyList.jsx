import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import getMatchColor from "./getMatchColor";
import Alert from "../Alert";
import moment from "moment";
import axios from "axios";

const NewCompanyList = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [jobField, setJobField] = useState(null);
  const [jobList, setJobList] = useState([]);

  const [selectedJob, setSelectedJob] = useState();
  const [viewedJobs, setViewedJobs] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 4;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = jobList.slice(indexOfFirstPost, indexOfLastPost);

  const [status, setStatus] = useState(null);

  const handleNext = () => {
    if (currentPage < Math.ceil(jobList.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
    setStatus(true);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    setStatus(true);
  };

  useEffect(() => {
    if (status != null) {
      window.scrollTo({
        top: 680,
        behavior: "smooth",
      });
    }
    setStatus(null);
  }, [status]);

  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJobId(job._id);
    if (!viewedJobs.includes(job.id)) {
      setViewedJobs([...viewedJobs, job.id]);
    }
    setIsAnimating(true);
    setSelectedJob(null);
    setTimeout(() => {
      setSelectedJob(job);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getMostMatchPost();
  }, [userLocation, jobField]);

  useEffect(() => {
    if (currentPosts.length == 0) {
      setCurrentPage(0);
    }
  }, [currentPosts]);

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
          setJobList(
            response.data.filter((job) => {
              const sevenDaysAgo = Date.now() - 604800000; // 7 วัน
              return Number(job.time_stamp) >= sevenDaysAgo;
            })
          );
          setCurrentPage(1);
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

  const millisToDays = (millis) => {
    const millisPerDay = 24 * 60 * 60 * 1000; 
    const today = Date.now(); 
    const pastDate = millis; 
    const diffInMillis = today - pastDate; 
    const diffInDays = Math.floor(diffInMillis / millisPerDay);
    return diffInDays;
  }

  return (
    <>
      {jobList.length == 0 ? (
        <>
          <div style={{ marginTop: "10px" }}>
            <div>
              <img
                src="../../public/PleaseSelectFiled.png"
                style={{ width: "300px" }}
              />
            </div>
            <div style={{ height: "50px" }}></div>
            <span
              style={{
                color: "#6c757d",
                fontSize: "24px",
                marginLeft: "30px",
              }}
            >
              ไม่เจอโพสต์ที่ Match กับคุณ
            </span>
          </div>
        </>
      ) : (
        <Container>
          <Row>
            <Col md={6}>
              {currentPosts.map((job) => (
                <Card
                  key={job._id}
                  className={`mb-4 ${isAnimating ? "fade-in-from-bottom" : ""}`}
                  style={{
                    ...cardStyle,
                    boxShadow: `0 0px 10px ${
                      selectedJobId === job._id
                        ? getMatchColor(job.matchPercentage)
                        : "white"
                    }`,
                  }}
                  onClick={() => handleJobClick(job)}
                >
                  <span
                    style={{
                      ...matchStyle,
                      backgroundColor: getMatchColor(job.matchPercentage),
                      boxShadow: `0 4px 15px ${getMatchColor(
                        job.matchPercentage
                      )}`,
                    }}
                  >
                    Match {job.matchPercentage}%
                  </span>
                  <Alert text= {millisToDays(job.time_stamp)+" วันที่ผ่านมา!"} />

                  <Card.Body>
                    <Card.Title style={titleStyle}>{job.Position}</Card.Title>
                    <div style={{ display: "flex" }}>
                      <Card.Subtitle style={locationStyle}>
                        {job.userId.companyName},&nbsp;
                      </Card.Subtitle>
                      <Card.Subtitle style={locationStyle}>
                        {job.Location}
                      </Card.Subtitle>
                    </div>
                    <Card.Subtitle style={companyStyle}>
                      เงินเดือน : {job.Salary}
                    </Card.Subtitle>
                    <Card.Text style={ellipsisStyle}>
                      <span style={{ fontWeight: "bold", color: "#3F4447" }}>
                        JobDescription :
                      </span>{" "}
                      {job.JobDescription}
                    </Card.Text>
                    <Card.Text>
                      โพสต์เมื่อ :{" "}
                      {moment(Number(job.time_stamp)).format("DD-MM-YYYY")}
                    </Card.Text>
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
                  style={{
                    ...selectCardStyle,
                    boxShadow: `0 0px 10px ${getMatchColor(
                      selectedJob.matchPercentage
                    )}`,
                  }}
                >
                  <span
                    style={{
                      ...matchStyle,
                      backgroundColor: getMatchColor(
                        selectedJob.matchPercentage
                      ),
                      boxShadow: `0 4px 15px ${getMatchColor(
                        selectedJob.matchPercentage
                      )}`,
                    }}
                  >
                    Match {selectedJob.matchPercentage}%
                  </span>
                  <Card.Body
                    style={{
                      maxHeight: "500px",
                      overflowY: "auto",
                      marginTop: "20px",
                    }}
                  >
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
                      {selectedJob.JobDescription.split("\n").map(
                        (line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        )
                      )}
                    </Card.Text>

                    <Card.Text>
                      <span style={{ fontWeight: "bold", color: "#3F4447" }}>
                        Qualifications : <br />
                      </span>
                      {selectedJob.Qualifications.split("\n").map(
                        (line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        )
                      )}
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
                  </Card.Body>
                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Card.Text>
                      โพสต์เมื่อ :{" "}
                      {moment(Number(selectedJob.time_stamp)).format(
                        "DD-MM-YYYY"
                      )}
                    </Card.Text>
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

          <div style={SlideNavigation}>
            <button
              style={NavigationButton}
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <span>
              Page {currentPage} of {Math.ceil(jobList.length / postsPerPage)}
            </span>
            <button
              style={NavigationButton}
              onClick={handleNext}
              disabled={
                currentPage === Math.ceil(jobList.length / postsPerPage)
              }
            >
              {">"}
            </button>
          </div>
        </Container>
      )}
    </>
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
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  marginBottom: "15px",
  position: "relative",
  backgroundColor: "#fff",
  animation: "fadeInFromBottom 0.3s ease-in",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333",
  marginTop: "15px",
  marginBottom: "15px",
};

const companyStyle = {
  fontSize: "16px",
  color: "#6c757d",
  marginBottom: "10px",
};

const locationStyle = {
  fontSize: "14px",
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

const selectCardStyle = {
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "15px",
  position: "relative",
  animation: "fadeInFromBottom 0.3s ease-in",
};

export default NewCompanyList;
