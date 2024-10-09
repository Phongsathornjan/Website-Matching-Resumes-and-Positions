import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FaUser } from "react-icons/fa6";
import { MdOtherHouses } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import StatusCard from "../components/StatusCard";
import getMatchColor from "../components/userComponents/getMatchColor";

const InsidePost = (idPost) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('รายชื่อผู้สมัคร : ทั้งหมด ')
  const [isLoading, setIsLoading] = useState(false);
  const [appState, setAppState] = useState("inPost");
  const [color1, setColor1] = useState("#B7E4B0");
  const [color2, setColor2] = useState("#fff");

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const totalPages = Math.ceil(candidates.length / postsPerPage);

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

  const setState = () => {
    if (appState == "inPost") {
      setAppState("outPost");
      setColor2("#f2d5ff");
      setColor1("#fff");
      setTitle("เจอคนที่ Match กับงานของคุณ : ทั้งหมด ")
      setCurrentPage(1)
      getMatchUserOutPost()
    } else if (appState == "outPost") {
      setAppState("inPost");
      setColor2("#fff");
      setColor1("#B7E4B0");
      setTitle("รายชื่อผู้สมัคร : ทั้งหมด ")
      setCurrentPage(1)
      getMatchUser()
    }
  };

  const appointmentButton = (userId) => {
    navigate(`/SendEmail/${userId}/${idPost.idPost}`);
  };

  const getMatchUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4001/getMostMatchUser/${idPost.idPost}`
      );
      setCandidates(response.data);
    } catch (e) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getMatchUserOutPost = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4001/getMostMatchFromOutPost/${idPost.idPost}`
      );
      console.log(response.data)
      setCandidates(response.data);
    } catch (e) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (idPost != null) {
      getMatchUser();
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 1000,
      behavior: "smooth",
    });
  }, [candidates]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({
      top: 1000,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({
      top: 1000,
      behavior: "smooth",
    });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCandidates = candidates.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div style={{ height: "100px" }}></div>
      <div style={{ padding: "20px" }}>
        <section style={searchSection}>
          <h2>หาผู้สมัครที่คุณต้องการ</h2>
          <div style={{ height: "20px" }}></div>
          <input
            type="text"
            placeholder="Find candidates who ...... ? "
            style={searchInput}
          />
        </section>
        <div
          style={{
            display: "flex",
            width: "400px",
            justifyContent: "space-between",
          }}
        >
          <div onClick={setState}>
            <StatusCard
              title="ผู้สมัคร"
              color={color1}
              icon={<FaUser />}
              iconAndTextColor="#009933"
            />
          </div>
          <div onClick={setState}>
            <StatusCard
              title="สรรหาจากนอกโพสต์"
              color={color2}
              icon={<MdOtherHouses />}
              iconAndTextColor="#9d8ee1"
            />
          </div>
        </div>
        <div style={{ height: "20px" }}></div>
        <h3>
          {title}
          <span style={{ color: "green" }}>{candidates.length} คน</span>
        </h3>
        {isLoading ? (
          <>
            <div style={{height: '200px'}}></div>
            <center><div style={spinnerStyle}></div></center>
            <div style={{height: '400px'}}></div>
          </>
        ) : (
          <>
            {candidates.length == 0 ? (
              <center style={noApplicantsStyle}>
                <div>
                  <div>
                    <img
                      src="../../public/PleaseSelectFiled.png"
                      style={{ width: "500px" }}
                    />
                  </div>
                  <div style={{ height: "20px" }}></div>
                  <span
                    style={{
                      color: "#6c757d",
                      fontSize: "42px",
                      marginLeft: "40px",
                    }}
                  >
                    ไม่มีผู้สมัคร
                  </span>
                </div>
              </center>
            ) : (
              <>
                <section style={candidatesSection}>
                  <div style={candidatesList}>
                    {currentCandidates.map((candidate, index) => (
                      <div
                        key={index}
                        style={{
                          ...candidateCard,
                          boxShadow: `0 0px 10px ${
                            selectedCandidates == candidate
                              ? getMatchColor(candidate.matchPercentage)
                              : "white"
                          }`,
                        }}
                        onClick={() => {
                          setSelectedCandidates(null);
                          setTimeout(() => setSelectedCandidates(candidate), 0);
                        }}
                      >
                        <div style={candidateDetails}>
                          <p>
                            <strong>Name : </strong>{" "}
                            {candidate.userId.first_name}{" "}
                            {candidate.userId.last_name}
                          </p>
                          <p>
                            <strong>Email : </strong> {candidate.userId.email}{" "}
                          </p>
                          <p>
                            <strong>Experience:</strong> {candidate.Experience}
                          </p>
                          <p>
                            <strong>Skill:</strong> {candidate.keyword}
                          </p>
                        </div>
                        <div style={candidateActions}>
                          <span
                            style={{
                              ...matchBadge,
                              backgroundColor: getMatchColor(
                                candidate.matchPercentage
                              ),
                              boxShadow: `0 4px 15px ${getMatchColor(
                                candidate.matchPercentage
                              )}`,
                            }}
                          >
                            Match {candidate.matchPercentage}%
                          </span>
                          <Button
                            variant="success"
                            onClick={() =>
                              appointmentButton(candidate.userId._id)
                            }
                            style={{ width: "200px" }}
                          >
                            นัดสัมภาษณ์
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedCandidates && (
                    <div
                      style={{
                        ...resumePreview,
                        boxShadow: `0 0px 10px ${getMatchColor(
                          selectedCandidates.matchPercentage
                        )}`,
                      }}
                    >
                      <center style={PDFStyle}>
                        <img
                          src={`../../public/Resume/${selectedCandidates.userId._id}-1.jpg`}
                          width={660}
                          height={932}
                        />
                      </center>
                    </div>
                  )}
                </section>
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
    </>
  );
};

const PDFStyle = {
  maxHeight: "650px",
  overflowY: "auto",
  padding: "10px",
  animation: "fadeInFromBottom 0.6s ease-in",
};

const searchSection = {
  margin: "0",
};

const searchInput = {
  width: "60%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginBottom: "20px",
};

const candidatesSection = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};
const candidatesList = {
  width: "50%",
  animation: "fadeInFromBottom 1.5s ease-in",
};
const candidateCard = {
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "15px",
  marginBottom: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const candidateDetails = {
  textAlign: "left",
  flex: 1,
};
const candidateActions = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "150px",
  marginLeft: "15px",
};

const matchBadge = {
  padding: "5px 10px",
  color: "#fff",
  borderRadius: "8px",
  fontWeight: "bold",
  width: "100%",
  textAlign: "center",
  marginBottom: "25px",
};
const resumePreview = {
  position: "sticky",
  top: "65px",
  height: "670px",
  width: "700px",
  borderRadius: "20px",
  animation: "fadeInFromBottom 0.6s ease-in",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
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

const noApplicantsStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
  flexDirection: "column",
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

export default InsidePost;
