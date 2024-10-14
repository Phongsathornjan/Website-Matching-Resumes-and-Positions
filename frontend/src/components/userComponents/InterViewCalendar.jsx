import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import axios from 'axios';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dataPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [interviewData, setInterviewData] = useState([]);

  const getAppointment = async () => {
    try{
      const userId = localStorage.getItem('id_user')
      if(userId){
        const response = await axios.get(`http://localhost:4001/getAppointmentById/${userId}`)
        setInterviewData(response.data)
      }
    }catch(err){
      console.log(err)
    }
  }


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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

  const filteredData = interviewData.filter((interview) => {
    if (interview.Date) {
      const interviewDate = parse(interview.Date, "dd/MM/yyyy", new Date());
      return (
        format(interviewDate, "yyyy-MM-dd") ===
        format(new Date(selectedDate), "yyyy-MM-dd")
      );
    }
    return false;
  });

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / dataPerPage));
  }, [filteredData]);

  useEffect(() => {
    getAppointment()
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        dateFormat="MMMM d, yyyy"
      />

      <div style={{ marginTop: "20px" }}>
        {currentData.length > 0 ? (
          currentData.map((interview) => (
            <div key={interview.Time} style={listStyle}>
              <h5 style={{ color: "black" }}>{interview.PostId.Position}</h5>
              <p>{interview.HrId.companyName}</p>

              <p>
                วันที่{" "}
                {format(
                  parse(interview.Date, "dd/MM/yyyy", new Date()),
                  "d MMM yyyy"
                )}{" "}
                เวลา: {interview.Time}
              </p>
              <p>Meeting Link : {interview.MeetingLink}</p>
            </div>
          ))
        ) : (
          <p>ไม่มีนัดสัมภาษณ์งานในวันนี้</p>
        )}
        <div style={SlideNavigation}>
          <button
            style={NavigationButton}
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <div>
            Page {currentPage > 1 && currentData.length === 0 ? currentPage - 1 : currentPage} of {totalPages}
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
    </div>
  );
};


const listStyle = {
  padding: "10px",
  backgroundColor: "#fff",
  marginBottom: "10px",
  border: "solid 1px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  width: "440px",
  animation: "fadeInFromBottom 0.5s ease-in",
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
  marginLeft: "150px",
  marginTop: "25px",
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

export default MyCalendar;
