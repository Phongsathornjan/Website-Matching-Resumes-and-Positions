import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const HrJobPost = () => {
  const [jobList, setJobList] = useState([]);
  const jobsPerPage = 6; // จำนวนงานต่อหน้า
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // แสดงรายการงานเฉพาะหน้านั้น ๆ
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = jobList.slice(startIndex, endIndex);

  async function getPost() {
    setIsLoading(true)
    const userId = localStorage.getItem("id_user");
    try {
      const response = await axios.get(
        `http://localhost:4001/getPost/${userId}`
      );
      setJobList(response.data);
      setIsLoading(false)
    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  }

  const OnClickDeletePost = async (idPost) => {
    swal({
      title: "Are you sure?",
      text: "ต้องการลบโพสต์ใช่ไหม ?",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "Delete",
          value: true,
          visible: true,
          className: "",
          closeModal: false,
        },
      },
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(
            `http://localhost:4001/deletePost/${idPost}`
          );
          swal({
            title: "OK!",
            text: "ลบโพสต์เรียบร้อย",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        } catch (err) {
          console.log(err);
          swal("Oops!", "Something went wrong!", "error");
        }
      }
    });
    
  };

  const ClosePost = async (idPost) =>{
    swal({
      title: "Are you sure?",
      text: "ต้องการปิดรับสมัครใช่ไหม ?",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "Yes",
          value: true,
          visible: true,
          className: "",
          closeModal: false,
        },
      },
      dangerMode: true,
    })
    .then(async (willClose) => {
      if (willClose) {
        try {
          const response = await axios.patch(`http://localhost:4001/closePost/${idPost}`);
          swal({
            title: "OK!",
            text: "ปิดรับสมัครเรียบร้อย",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        } catch (err) {
          console.log(err);
          swal("Oops!", "Something went wrong!", "error");
        }
      }
    });
    
  }

  useEffect(() => {
    setTotalPages(Math.ceil(jobList.length / jobsPerPage));
  }, [jobList]);

  useEffect(() => {
    //Get Post
    getPost();

    // เพิ่ม global animation style
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyle;
    document.head.appendChild(styleSheet);

    // ลบ style เมื่อ component ถูกทำลาย
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <>
        <div style={{height: '200px'}}></div>
          {isLoading && (
            <center>
              <div style={spinnerStyle}></div>
            </center>
          )}
        </>
      ) : (
        <>
          {jobList.length === 0 ? (
            <center>
              <div style={{ animation: "fadeInFromBottom 0.6s ease-in" }}>
                <div
                  style={{ fontSize: "20px", color: "gray", marginTop: "80px" }}
                >
                  คุณยังไม่มีโพสต์รับสมัคร สามารถสร้างได้เลยตอนนี้
                </div>
                <img
                  src="/PleaseSelectFiled.png"
                  style={imgStyle}
                />
              </div>
            </center>
          ) : (
            <>
              {currentJobs.map((job) => (
                <Card key={job.time_stamp} className="mb-3" style={cardStyle}>
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Card.Title style={ellipsisStyle}>
                        {job.Position}
                      </Card.Title>
                      <Button
                        variant="danger"
                        onClick={() => OnClickDeletePost(job._id)}
                      >
                        ลบโพสต์
                      </Button>
                    </div>
                    <Card.Subtitle className="mb-2 text-muted">
                      เงินเดือน : {job.Salary}
                    </Card.Subtitle>
                    <Card.Text style={ellipsisStyle}>
                      JobDescription : {job.JobDescription}
                    </Card.Text>
                    <Card.Text style={ellipsisStyle}>
                      Qualifications / Requirement: {job.Qualifications}
                    </Card.Text>
                    <Card.Text style={ellipsisStyle}>
                      Experience : {job.Experience}
                    </Card.Text>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Card.Text>
                        โพสต์เมื่อวันที่ :{" "}
                        {moment(Number(job.time_stamp)).format("DD-MM-YYYY")}
                      </Card.Text>
                      <div
                        style={{
                          width: "250px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Link to={`/PostDetail/${job._id}`}>
                          <Button variant="success">รายละเอียด</Button>
                        </Link>
                        <Button variant="primary" onClick={()=>ClosePost(job._id)}>ปิดรับสมัคร</Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
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
            </>
          )}
        </>
      )}
    </div>
  );
};

const ellipsisStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const cardStyle = {
  width: "1000px",
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

const imgStyle = {
  width: "400px",
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

export default HrJobPost;
