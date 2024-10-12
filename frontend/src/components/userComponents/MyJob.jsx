import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Alert from "../Alert";
import MyCalendar from "./InterViewCalendar";
import axios from "axios";
import moment from "moment";

import swal from "sweetalert";
const MyJob = () => {
  const [isLoading, setIsLoading] = useState(null);

  const [applicant, setApplicant] = useState(null);
  const [selectDateStatus, setSelectDateStatus] = useState(false);

  const MakeAppointment = async (post, applicants, companyData, position) => {
    swal({
      content: {
        element: "div",
        attributes: {
          innerHTML: `
            <h4>นัดหมายสัมภาษณ์</h4>
            <h5>บริษัท ${post.CompanyData[0].companyName}</h5>
            <h5>ตำแหน่ง : ${post.Position}</h5>
            <h5>โดยบริษัทมี 3 ช่วงเวลาให้เลือกดังนี้</h5>
            <div id="appointment-buttons" style="display: flex; flex-direction: column; gap: 10px;">
              <center>
              <button id="day1-button" style="width: 300px; padding: 10px; background-color: #80bfff; color: white; border: none; border-radius: 5px; margin:10px">
                ${post.applicants[0].SelectAppointment.Date1} ${post.applicants[0].SelectAppointment.Time1}
              </button>
              </center>
              <center>
              <button id="day2-button" style="width: 300px; padding: 10px; background-color: #80bfff; color: white; border: none; border-radius: 5px; margin-bottom:10px">
                ${post.applicants[0].SelectAppointment.Date2} ${post.applicants[0].SelectAppointment.Time2}
              </button>
              </center>
              <center>
              <button id="day3-button" style="width: 300px; padding: 10px; background-color: #80bfff; color: white; border: none; border-radius: 5px; margin-bottom:10px">
                ${post.applicants[0].SelectAppointment.Date3} ${post.applicants[0].SelectAppointment.Time3}
              </button>
              </center>
              <div style="display: flex; justify-content: center; margin-top: 10px;">
              <button id="cancel-button" style="padding: 10px; background-color: #f44336; color: white; border: none; border-radius: 5px;">
                ยกเลิก
              </button>
              <div style="width: 20px"></div>
              <button id="confirm-button" style="padding: 10px; background-color: #ccc; color: white; border: none; border-radius: 5px;" disabled>
                OK
              </button>
              </div>
            </div>
          `,
        },
      },
      icon: "info",
      buttons: false,
    });

    document.getElementById("day1-button").onclick = () => {
      setApplicant({
        applicantsID: post.applicants[0].applicantsID,
        userId: post.applicants[0].userId,
        HrId: post.userId,
        Date: post.applicants[0].SelectAppointment.Date1,
        Time: post.applicants[0].SelectAppointment.Time1,
        InterviewType: post.applicants[0].SelectAppointment.InterviewType,
        MeetingLink: post.applicants[0].SelectAppointment.MeetingLink,
        InterviewVer: post.applicants[0].SelectAppointment.InterviewVer,
        Position: post.Position,
        PostId: post._id,
      });
      document.getElementById("day1-button").style.backgroundColor = "#66ff99";
      document.getElementById("day2-button").style.backgroundColor = "#80bfff";
      document.getElementById("day3-button").style.backgroundColor = "#80bfff";
      document.getElementById("confirm-button").disabled = false;
      document.getElementById("confirm-button").style.backgroundColor =
        "#66ff99";
    };

    document.getElementById("day2-button").onclick = () => {
      setApplicant({
        applicantsID: post.applicants[0].applicantsID,
        userId: post.applicants[0].userId,
        HrId: post.userId,
        Date: post.applicants[0].SelectAppointment.Date2,
        Time: post.applicants[0].SelectAppointment.Time2,
        InterviewType: post.applicants[0].SelectAppointment.InterviewType,
        MeetingLink: post.applicants[0].SelectAppointment.MeetingLink,
        InterviewVer: "8",
        Position: post.Position,
        PostId: post._id,
      });
      document.getElementById("day1-button").style.backgroundColor = "#80bfff";
      document.getElementById("day2-button").style.backgroundColor = "#66ff99";
      document.getElementById("day3-button").style.backgroundColor = "#80bfff";
      document.getElementById("confirm-button").disabled = false;
      document.getElementById("confirm-button").style.backgroundColor =
        "#66ff99";
    };

    document.getElementById("day3-button").onclick = () => {
      setApplicant({
        applicantsID: post.applicants[0].applicantsID,
        userId: post.applicants[0].userId,
        HrId: post.userId,
        Date: post.applicants[0].SelectAppointment.Date3,
        Time: post.applicants[0].SelectAppointment.Time3,
        InterviewType: post.applicants[0].SelectAppointment.InterviewType,
        MeetingLink: post.applicants[0].SelectAppointment.MeetingLink,
        InterviewVer: "8",
        Position: post.Position,
        PostId: post._id,
      });
      document.getElementById("day1-button").style.backgroundColor = "#80bfff";
      document.getElementById("day2-button").style.backgroundColor = "#80bfff";
      document.getElementById("day3-button").style.backgroundColor = "#66ff99";
      document.getElementById("confirm-button").disabled = false;
      document.getElementById("confirm-button").style.backgroundColor =
        "#66ff99";
    };

    document.getElementById("cancel-button").onclick = () => {
      swal.close();
    };

    document.getElementById("confirm-button").onclick = () => {
      swal.close();
      setSelectDateStatus(true);
    };
  };

  useEffect(() => {
    if (applicant != null && selectDateStatus) {
      CreateAppointment(applicant);
    }
  }, [applicant, selectDateStatus]);

  const getAppliedJob = async () => {
    const userId = localStorage.getItem("id_user");
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4001/getAppliedJob/${userId}`
      );
      setJobApplyList(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
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

  const CreateAppointment = async (applicant) => {
    console.log(applicant);
    try {
      const response = await axios.post(
        "http://localhost:4001/CreateInterviewAppointment",
        applicant
      );
      swal("สำเร็จ", "นัดสัมภาษณ์เรียบร้อย!", "success");
      window.location.reload();
    } catch (err) {
      console.log(err);
      swal("Oops!", `Internal server error : ${err}`, "error");
    }
  };

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
      {isLoading ? (
        <>
          <div style={applyHistoryStyle}>
            <h1>งานที่สมัครแล้ว</h1>
            <div style={{ marginTop: "150px" }}>
              <center>
                <div style={spinnerStyle}></div>
              </center>
            </div>
          </div>
        </>
      ) : (
        <>
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
                      {job.applicants[0].status == "SelectAppointment" && (
                        <Alert text="สัมภาษณ์!" />
                      )}
                      <div>
                        <Card.Title style={titleStyle}>
                          {job.Position}
                        </Card.Title>
                        <Card.Subtitle style={companyNameStyle}>
                          {job.companyName}
                        </Card.Subtitle>
                        <Card.Subtitle style={LocationStyle}>
                          {job.Location}
                        </Card.Subtitle>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Card.Text style={postedTextStyle}>
                          สมัครเมื่อ{" "}
                          {moment(Number(job.applicants[0].time_stamp)).format(
                            "DD-MM-YYYY"
                          )}
                        </Card.Text>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {job.applicants[0].status === "SelectAppointment" && (
                            <Button
                              variant="danger"
                              style={interviewButtonStyle}
                              onClick={() =>
                                MakeAppointment(
                                  job,
                                  job.applicants[0],
                                  job.CompanyData[0],
                                  job.Position
                                )
                              }
                            >
                              นัดสัมภาษณ์
                            </Button>
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
        </>
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

const spinnerStyle = {
  border: "4px solid rgba(0, 0, 0, 0.1)",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  borderLeftColor: "#09f",
  animation: "spin 1s ease infinite",
  marginBottom: "30px",
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

export default MyJob;
