import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Alert from "../Alert";
import MyCalendar from "./InterViewCalendar";
import axios from "axios";
import moment from 'moment'

const MyJob = () => {
  const getAppliedJob = async () => {
    const userId = localStorage.getItem("id_user");
    try {
      const response = await axios.get(
        `http://localhost:4001/getAppliedJob/${userId}`
      );
      setJobApplyList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [jobApplyList, setJobApplyList] = useState([]);
  const jobsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setTimeout(function () {
        window.scrollTo({
          top: 680,
          behavior: "smooth",
        });
      }, 100);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setTimeout(function () {
        window.scrollTo({
          top: 680,
          behavior: "smooth",
        });
      }, 100);
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = jobApplyList.slice(startIndex, endIndex);

  useEffect(() => {
    setTotalPages(Math.ceil(jobApplyList.length / jobsPerPage));
  }, [jobApplyList]);

  useEffect(() => {
    getAppliedJob();

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
    <div style={ContainerStyle}>
      {jobApplyList.length == 0 ? (
        <>
          <div style={applyHistoryStyle}>
            <h1>งานที่สมัครแล้ว</h1>
            <div>
              <img
                src="../../public/PleaseSelectFiled.png"
                style={{ marginTop: "20px", width: "200px" }}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ color: "#828282" }}>
                คุณยังไม่มีงานที่สมัคร สมัครเลย <a href="">ที่นี่</a>
              </h4>
            </div>
          </div>
        </>
      ) : (
        <div style={applyHistoryStyle}>
          <h1>งานที่สมัครแล้ว</h1>
          <div style={{ marginTop: "20px" }}>
            {currentJobs.map((job) => (
              <Card key={job._id} className={`mb-3`} style={cardStyle}>
                <Card.Body
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {job.applicants[0].status == "interview" && <Alert text="สัมภาษณ์!" />}
                  <div>
                    <Card.Title style={titleStyle}>{job.Position}</Card.Title>
                    <Card.Subtitle style={companyNameStyle}>
                      {job.companyName}
                    </Card.Subtitle>
                    <Card.Subtitle style={LocationStyle}>
                      {job.Location}
                    </Card.Subtitle>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Card.Text style={postedTextStyle}>
                      สมัครเมื่อ {moment(Number(job.applicants[0].time_stamp)).format('DD-MM-YYYY')} 
                    </Card.Text>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {job.applicants[0].status === "interview" && (
                        <Link to={"#"}>
                          <Button variant="danger" style={interviewButtonStyle}>
                            นัดสัมภาษณ์
                          </Button>
                        </Link>
                      )}
                      <Link to={`/userJobApplication?idPost=${job._id}`}>
                        <Button variant="success" style={detailButtonStyle}>
                          ดูโพส
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
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
        </div>
      )}
      <div style={interviewMenuStyle}>
        <h1>นัดสัมภาษณ์งานของฉัน</h1>
        <MyCalendar />
      </div>
    </div>
  );
};

const ContainerStyle = {
  marginLeft: "150px",
  display: "flex",
  justifyContent: "space-between",
};

const applyHistoryStyle = {
  width: "600px",
  color: "#828282",
};

const interviewMenuStyle = {
  width: "600px",
  color: "#828282",
};

const cardStyle = {
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  padding: "5px",
  marginBottom: "15px",
  position: "relative",
  backgroundColor: "#fff",
  animation: "fadeInFromBottom 0.5s ease-in",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "15px",
};

const companyNameStyle = {
  fontSize: "16px",
  color: "#6c757d",
  marginBottom: "10px",
};

const LocationStyle = {
  fontSize: "14px",
  color: "#6c757d",
  marginBottom: "10px",
};

const postedTextStyle = {
  fontSize: "12px",
  color: "#999",
  alignSelf: "flex-start",
};

const detailButtonStyle = {
  padding: "8px 20px",
  fontSize: "14px",
};

const interviewButtonStyle = {
  padding: "8px 20px",
  fontSize: "14px",
  marginRight: "30px",
  backgroundColor: "red",
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

export default MyJob;
