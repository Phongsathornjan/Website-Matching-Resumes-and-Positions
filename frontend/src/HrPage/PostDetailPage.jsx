import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import HRNavbar from "../components/navbar/HRNavbar";

const PostDetailPage = () => {
  const { idPost } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [jobDetail, setJobDetail] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    //api getPostById
    getPostDetail();

    //load animation
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyle;
    document.head.appendChild(styleSheet);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const getPostDetail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4001/getPostDetail/${idPost}`
      );
      setIsLoading(false);
      setJobDetail(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HRNavbar />
      <div style={{ height: "100px" }}></div>
      {isLoading ? (
        <center>
          <div style={spinnerStyle}></div>
        </center>
      ) : (
        <>
          {jobDetail.length != 0 && (
            <div className="container" style={Fade}>
              <section className="mb-5 w-75">
                <h5>
                  <strong>Full Descriptions</strong>
                </h5>
                <div className="card mt-3 p-4">
                  <h4>
                    <strong>Position : {jobDetail.Position}</strong>
                  </h4>
                  <p>สถานที่ทำงาน : </p>
                  <p>เงินเดือน : {jobDetail.Salary} </p>
                  <div className="mb-3">
                    <h5 style={{ fontWeight: "bold", color: "#3F4447" }}>
                      JobDescription : <br />
                    </h5>
                    {jobDetail.JobDescription.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="mb-3">
                    <h5 style={{ fontWeight: "bold", color: "#3F4447" }}>
                      Qualifications : <br />
                    </h5>
                    {jobDetail.Qualifications.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="mb-3">
                    <h5 style={{ fontWeight: "bold", color: "#3F4447" }}>
                      Experience : <br />
                    </h5>
                    {jobDetail.Experience.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                  <h5>
                    <strong>Working</strong>
                  </h5>
                  <p className="mb-1">
                    Working Location : {jobDetail.Location}
                  </p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="mb-1">โพสต์เมื่อ : {jobDetail.time_stamp}</p>
                    <Link to={"/InsidePost"}>
                      <button className="btn btn-success">
                        คัดเลือกผู้สมัคร
                      </button>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </>
  );
};

const Fade = {
  animation: "fadeInFromBottom 1s ease-in",
};

const spinnerStyle = {
  border: "4px solid rgba(0, 0, 0, 0.1)",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  borderLeftColor: "#09f",
  animation: "spin 1s ease infinite",
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

body {
  margin: 0;
  font-family: 'Trirong', sans-serif;
}
`;

export default PostDetailPage;
