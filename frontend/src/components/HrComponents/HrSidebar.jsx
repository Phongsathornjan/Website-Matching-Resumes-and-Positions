import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBriefcase, FaCalendarCheck, FaUsers } from "react-icons/fa";

import StatusCard from "../../components/StatusCard";

function HrSidebar({ onSidebarClick }) {
  const [color1, setColor1] = useState("#f2d5ff");
  const [color2, setColor2] = useState("#fff");
  const [color3, setColor3] = useState("#fff");

  const onClickButton = (color, clickOn) => {
    switch (clickOn) {
      case "job":
        setColor1(color);
        setColor2("#fff");
        setColor3("#fff");
        onSidebarClick("job");
        break;
      case "interview":
        setColor2(color);
        setColor3("#fff");
        setColor1("#fff");
        onSidebarClick("interview");
        break;
      case "close":
        setColor3(color);
        setColor2("#fff");
        setColor1("#fff");
        onSidebarClick("close");
        break;
    }
  };

  return (
    <div style={sidebarStyle}>
      <center>
        <p style={fontStyle}>Create Your Post</p>
        <Link to={"/CreatePost"}>
          <button style={buttonStyle}>Create</button>
        </Link>
        <div>
          <div
            style={statusStyle}
            onClick={() => onClickButton("#f2d5ff", "job")}
          >
            <StatusCard
              title="Job"
              color={color1}
              icon={<FaBriefcase />}
              iconAndTextColor="#9d8ee1"
            />
          </div>
          <div
            style={statusStyle}
            onClick={() => onClickButton("#faffd5", "interview")}
          >
            <StatusCard
              title="Interview"
              color={color2}
              icon={<FaCalendarCheck />}
              iconAndTextColor="#f1c40f"
            />
          </div>
          <div
            style={statusStyle}
            onClick={() => onClickButton("#E1FFD0", "close")}
          >
            <StatusCard
              title="close"
              color={color3}
              icon={<FaCalendarCheck />}
              iconAndTextColor="#7BC752"
            />
          </div>
        </div>
      </center>
    </div>
  );
}

const sidebarStyle = {
  width: "220px",
  padding: "20px",
  marginLeft: "30px",
};

const fontStyle = {
  fontWeight: "bold",
  fontSize: "22px",
};

const buttonStyle = {
  marginTop: "10px",
  marginBottom: "70px",
  padding: "10px 20px",
  backgroundColor: "#ff6b6b",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "5px",
  width: "180px",
};

const statusStyle = {
  marginBottom: "40px",
};

export default HrSidebar;
