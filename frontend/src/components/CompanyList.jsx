import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { JobListContext } from "../context/JobListContext";
import moment from 'moment'

const CompanyList = () => {
  const [jobList] = React.useContext(JobListContext);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(jobList.length / postsPerPage);

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

  const [selectedJob, setSelectedJob] = useState(null);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentJobs = jobList.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      {jobList.length === 0 ? (
        <center style={fade}>
          <div>
            <img
              src="../../public/PleaseSelectFiled.png"
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
                    <Card.Title>{job.Position}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {job.Location}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
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
                      </span>{" "}
                      {job.Experience}
                    </Card.Text>
                    <Card.Text>โพสต์เมื่อ : {moment(Number(job.time_stamp)).format('DD-MM-YYYY')}</Card.Text>
                    <Button variant="primary">รายละเอียด</Button>
                  </Card.Body>
                </Card>
              ))}
            </Col>
            <Col md={6}  style={{ position: 'sticky', top: '90px', height: 'fit-content' }}>
              {selectedJob ? (
                <Card style={cardStyle}>
                  <Card.Body>
                    <Card.Title>{selectedJob.Position}</Card.Title>
                    <Card.Text>{selectedJob.Location}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">
                      เงินเดือน : {selectedJob.Salary}
                    </Card.Subtitle>
                    <Card.Text>
                      <p style={{ fontWeight: "bold", color: "#3F4447" }}>
                        JobDescription :
                      </p>{" "}
                      {selectedJob.JobDescription}
                    </Card.Text>
                    <Card.Text>
                      <p style={{ fontWeight: "bold", color: "#3F4447" }}>
                        Qualifications :
                      </p>{" "}
                      {selectedJob.Qualifications}
                    </Card.Text>
                    <Card.Text>
                      <p style={{ fontWeight: "bold", color: "#3F4447" }}>
                        Experience :{" "}
                      </p>{" "}
                      {selectedJob.Experience}
                    </Card.Text>
                    <Card.Text>{moment(Number(selectedJob.time_stamp)).format('DD-MM-YYYY')}</Card.Text>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "500px" }}></div>
                      <Link to={"/SignIn"}>
                        <Button variant="success">สมัครที่นี่</Button>
                      </Link>
                    </div>
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

const fade = {
  animation: "fadeInFromBottom 0.6s ease-in",
};

const cardStyle = {
  borderRadius: "20px",
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

export default CompanyList;
