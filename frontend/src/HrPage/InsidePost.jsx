import React, { useEffect, useState } from "react";
import getMatchColor from "../components/userComponents/getMatchColor";
import axios from "axios";

const InsidePost = (idPost) => {
  const [isLoading, setIsLoading] = useState(false);

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState(null);

  const getMatchUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4001/getMostMatchUser/${idPost.idPost}`
      );
      console.log(response.data);
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

  return (
    <>
      <div style={{ height: "100px" }}></div>
      <div style={pageContainer}>
        <section style={searchSection}>
          <h2>หาผู้สมัครที่คุณต้องการ</h2>
          <div style={{ height: "20px" }}></div>
          <input
            type="text"
            placeholder="Find candidates who ...... ? "
            style={searchInput}
          />
        </section>
        <div style={{ height: "20px" }}></div>
        <h3 style={{ marginLeft: "80px" }}>รายชื่อผู้สมัคร</h3>
        {isLoading ? (
          <center style={spinnerStyle}></center>
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
              <section style={candidatesSection}>
                <div style={candidatesList}>
                  {candidates.map((candidate, index) => (
                    <div
                      key={index}
                      style={{
                        ...candidateCard,
                        boxShadow: `0 0px 10px ${
                          selectedCandidates==
                          candidate
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
                          <strong>Name : </strong> {candidate.userId.first_name}{" "}
                          {candidate.userId.last_name} {""}
                          <strong>Email : </strong> {candidate.userId.email}{" "}
                          {""}
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
                        <button style={interviewButton}>
                          Interview appointment
                        </button>
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
                        width={556}
                        height={787}
                      />
                    </center>
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
};

// {isLoading ? (
//   <center style={spinnerStyle}></center>
// ) : (

const PDFStyle = {
  padding: "10px",
  animation: "fadeInFromBottom 0.6s ease-in",
};

const pageContainer = {
  padding: "20px",
};
const searchSection = {
  margin: "20px 0",
  textAlign: "center",
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
  marginLeft: "75px",
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
const interviewButton = {
  padding: "10px 15px",
  backgroundColor: "#65BDE7",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  width: "100%",
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
  height: "800px",
  width: "800px",
  borderRadius: "20px",
  animation: "fadeInFromBottom 0.6s ease-in",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
};

const spinnerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh", // ปรับความสูงเพื่อให้อยู่กลางจอ
};

const noApplicantsStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh", // ปรับความสูงเพื่อให้อยู่กลางจอ
  flexDirection: "column", // จัดวางเนื้อหาเป็น column
};

export default InsidePost;
