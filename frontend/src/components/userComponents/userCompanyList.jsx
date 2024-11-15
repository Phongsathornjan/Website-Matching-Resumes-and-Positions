import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

import { JobListUserContext } from "../../context/JobListUserContext";

const UserCompanyList = () => {
  const [jobList, setJobList] = React.useContext(JobListUserContext);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6; // จำนวนโพสต์ต่อหน้า
  const totalPages = Math.ceil(jobList.length / jobsPerPage);

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

  useEffect(() => {
    setSelectedJob(null);
  }, [jobList]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // กำหนดช่วงโพสต์ที่จะแสดงตามหน้า
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobList.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <>
      {jobList.length === 0 ? (
        <center style={fade}>
          <div>
            <img
              src="/PleaseSelectFiled.png"
              style={{ marginTop: "60px", width: "400px" }}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <span style={{ color: "#828282", fontSize: "48px" }}>
              ไม่เจอผลลัพธ์
            </span>
          </div>
        </center>
      ) : (
        <Container>
          <Row>
            <Col md={6}>
              {currentJobs.map((job) => (
                <Card
                  key={job._id}
                  className="mb-3"
                  style={cardStyle}
                  onClick={() => {
                    setSelectedJob(null);
                    setTimeout(() => setSelectedJob(job), 0);
                  }}
                >
                  <Card.Body>
                    <Card.Title className="mb-3">{job.Position}</Card.Title>
                    <div style={{ display: "flex" }} className="mb-2">
                      <Card.Subtitle>{job.companyName},&nbsp;</Card.Subtitle>
                      <Card.Subtitle>{job.Location}</Card.Subtitle>
                    </div>
                    <Card.Subtitle className="mb-3">
                      เงินเดือน : {job.Salary}
                    </Card.Subtitle>
                    <Card.Text style={ellipsisStyle}>
                      <span style={{ fontWeight: "bold", color: "#3F4447" }}>
                        JobDescription :
                      </span>{" "}
                      {job.JobDescription}
                    </Card.Text>
                    <Card.Text style={ellipsisStyle}>
                      <span style={{ fontWeight: "bold", color: "#3F4447" }}>
                        Qualifications :{" "}
                      </span>
                      {job.Qualifications}
                    </Card.Text>
                    <Card.Text style={ellipsisStyle}>
                      <span style={{ fontWeight: "bold", color: "#3F4447" }}>
                        Experience :{" "}
                      </span>
                      {job.Experience}
                    </Card.Text>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
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
                  style={{
                    ...cardStyle,
                    maxHeight: "841px",
                  }}
                >
                  <Card.Body
                    style={{
                      maxHeight: "541px",
                      overflowY: "auto",
                      marginTop: "4px",
                    }}
                  >
                    <Card.Title className="mb-3">
                      {selectedJob.Position}
                    </Card.Title>
                    <div style={{ display: "flex" }} className="mb-2">
                      <Card.Subtitle>
                        {selectedJob.companyName},&nbsp;
                      </Card.Subtitle>
                      <Card.Subtitle>{selectedJob.Location}</Card.Subtitle>
                    </div>
                    <Card.Subtitle className="mb-2">
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
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "20px",
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
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <button
              style={NavigationButton}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        </Container>
      )}
    </>
  );
};

const ellipsisStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const cardStyle = {
  borderRadius: "20px",
  animation: "fadeInFromBottom 0.6s ease-in",
};

const fade = {
  animation: "fadeInFromBottom 0.6s ease-in",
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

const postedTextStyle = {
  color: "#999",
  alignSelf: "flex-start",
};

const applyButtonStyle = {
  padding: "8px 20px",
  fontSize: "14px",
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

export default UserCompanyList;
