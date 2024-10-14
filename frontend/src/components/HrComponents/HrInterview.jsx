import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format, parse } from 'date-fns';
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function AppointmentsPage() {
  useEffect(() => {
    getAppointment();
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

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredData = appointments.filter((appointments) => {
    if (appointments.Date) {
      const appointmentsDate = parse(
        appointments.Date,
        "dd/MM/yyyy",
        new Date()
      );
      return (
        format(appointmentsDate, "yyyy-MM-dd") ===
        format(new Date(selectedDate), "yyyy-MM-dd")
      );
    }
    return false;
  });

  const getAppointment = async () => {
    try {
      const userId = localStorage.getItem("id_user");
      if (userId) {
        const response = await axios.get(
          `http://localhost:4001/getAppointmentById/${userId}`
        );
        setAppointments(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openResumePage = (userId) => {
    window.open(`/Resume/${userId}`, '_blank')
  }

  return (
    <div style={{ animation: "fadeInFromBottom 0.6s ease-in" }}>
      <center>
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            dateFormat="MMMM d, yyyy"
          />
        </div>
      </center>
      <div style={{ height: "20px" }}></div>
      {filteredData.length > 0 ? (
        filteredData.map((appointments) => (
          <Card key={appointments._id} style={cardStyle}>
            <Card.Body>
              <Card.Title style={ellipsisStyle}>
                {appointments.PostId.Position}
              </Card.Title>
              <Card.Text style={ellipsisStyle}>
                วันที่{" "}
                {format(
                  parse(appointments.Date, "dd/MM/yyyy", new Date()),
                  "d MMM yyyy"
                )}{" "}
                เวลา : {appointments.Time}
              </Card.Text>
              <Card.Text style={ellipsisStyle}>
                ผู้สมัคร : {appointments.userId.first_name} {appointments.userId.last_name}
              </Card.Text>
              <Card.Text style={ellipsisStyle}>
                Email ผู้สมัคร : {appointments.userId.email}
              </Card.Text>
              <Card.Text style={ellipsisStyle}>
                ผู้สัมภาษณ์ : {appointments.InterviewVer}
              </Card.Text>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Card.Text style={ellipsisStyle}>
                  Meeting Link : {appointments.MeetingLink}
                </Card.Text>
                  <Button variant="primary" style={ButtonStyle} onClick={()=>openResumePage(appointments.userId._id)}>
                    Resume
                  </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <center>
          <p style={{ fontSize: "20px", color: "gray", marginTop: "25px" }}>
            ไม่มีนัดสัมภาษณ์งานในวันนี้
          </p>
        </center>
      )}
    </div>
  );
}

const ellipsisStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const cardStyle = {
  width: "1000px",
  borderRadius: "20px",
  animation: "fadeInFromBottom 0.6s ease-in",
  marginBottom: "15px",
};

const ButtonStyle = {
  padding: "8px 20px",
  fontSize: "14px",
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
}`;

export default AppointmentsPage;
