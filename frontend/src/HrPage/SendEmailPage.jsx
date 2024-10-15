import React, { useEffect, useState } from "react";
import HRNavbar from "../components/navbar/HRNavbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { parse, isSameDay, format } from "date-fns";

const SendEmailPage = () => {
  const navigate = useNavigate();

  const { userId, PostId } = useParams();
  const [interviewData, setInterviewData] = useState([]);
  const [filteredInterviewData, setFilteredInterviewData] = useState([]);
  const [SelectedDate, setSelectedDate] = useState([]);

  const getAppointment = async () => {
    try {
      const HrId = localStorage.getItem("id_user");
      if (HrId) {
        const response = await axios.get(
          `http://localhost:4001/getAppointmentById/${HrId}`
        );
        setInterviewData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filterInterviewData = (selectedDate) => {
    if (!selectedDate) return [];

    return interviewData.filter((interview) => {
      const interviewDate = parse(interview.Date, "dd/MM/yyyy", new Date());
      return isSameDay(interviewDate, selectedDate); // ตรวจสอบว่าตรงกับวันที่ที่เลือก
    });
  };

  useEffect(() => {
    getAppointment();
    window.scrollTo(0, 0);

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

  useEffect(() => {
    async function authentication() {
      try {
        let token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:4001/auth",
          {},
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        if (response.status == 200) {
          if (response.data.userData.role != "hr") {
            navigate("/SignIn");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    authentication();
  }, []);

  const [MeetingLink, setMeetingLink] = React.useState("");
  const [selectedDate1, setSelectedDate1] = React.useState(null);
  const [selectedDate2, setSelectedDate2] = React.useState(null);
  const [selectedDate3, setSelectedDate3] = React.useState(null);
  const [selectedTime1, setSelectedTime1] = React.useState("");
  const [selectedTime2, setSelectedTime2] = React.useState("");
  const [selectedTime3, setSelectedTime3] = React.useState("");
  const [interviewFormat, setInterviewFormat] = React.useState("");
  const [InterviewVer, setInterviewVer] = React.useState("");

  const [activeDateField, setActiveDateField] = React.useState(null);

  const timeOptions = [
    { value: "09:00 - 10:00", label: "09:00 - 10:00" },
    { value: "10:00 - 11:00", label: "10:00 - 11:00" },
    { value: "11:00 - 12:00", label: "11:00 - 12:00" },
    { value: "13:00 - 14:00", label: "13:00 - 14:00" },
    { value: "14:00 - 15:00", label: "14:00 - 15:00" },
    { value: "15:00 - 16:00", label: "15:00 - 16:00" },
    { value: "16:00 - 17:00", label: "16:00 - 17:00" },
    { value: "17:00 - 18:00", label: "17:00 - 18:00" },
  ];

  const interviewFormatOptions = [
    { value: "onsite", label: "Onsite" },
    { value: "online", label: "Online" },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (activeDateField === "date1") setSelectedDate1(date);
    if (activeDateField === "date2") setSelectedDate2(date);
    if (activeDateField === "date3") setSelectedDate3(date);
  };

  useEffect(() => {
    setFilteredInterviewData(filterInterviewData(SelectedDate));
  }, [interviewData, SelectedDate]);

  const handleSendAppointment = async () => {
    try {
      if (
        !selectedDate1 ||
        !selectedDate2 ||
        !selectedDate3 ||
        !selectedTime1 ||
        !selectedTime2 ||
        !selectedTime3 ||
        !MeetingLink ||
        !interviewFormat
      ) {
        swal("Oops!", "กรุณากรอกข้อมูลให้ครบ", "error");
      } else {
        const response = await axios.post(
          `http://localhost:4001/makeAppointment/${userId}/${PostId}`,
          {
            Date1: new Date(selectedDate1).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            Date2: new Date(selectedDate2).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            Date3: new Date(selectedDate3).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            Time1: selectedTime1,
            Time2: selectedTime2,
            Time3: selectedTime3,
            InterviewType: interviewFormat,
            MeetingLink: MeetingLink,
            InterviewVer: InterviewVer,
          }
        );
        swal({
          title: "DONE!",
          text: "สร้างนัดหมายเรียบร้อย",
          icon: "success",
        }).then(() => {
          navigate(`/PostDetail/${PostId}`);
        });
      }
    } catch (err) {
      console.log(e);
      swal("Oops!", "Internal server error", "error");
    }
  };

  return (
    <>
      <HRNavbar />
      <div style={containerStyle}>
        <div style={formAndCalendarStyle}>
          <div style={formStyle}>
            <div style={fullRowStyle}>
              <div style={inputWrapperStyle}>
                <label style={labelStyle}>Meeting link :</label>
                <input
                  type="text"
                  placeholder="Enter the meeting link"
                  style={inputStyle}
                  onChange={(e) => {
                    setMeetingLink(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* Date and Time 1 */}
            <div style={formRowStyle}>
              <div style={halfInputWrapperStyle}>
                <label style={labelStyle}>วันที่ 1</label>
                <input
                  type="text"
                  value={
                    selectedDate1
                      ? selectedDate1.toLocaleDateString("th-TH")
                      : ""
                  }
                  onFocus={() => setActiveDateField("date1")}
                  placeholder="Select a date"
                  style={inputStyle}
                  readOnly
                />
              </div>
              <div style={halfInputWrapperStyle}>
                <label style={labelStyle}>เวลา</label>
                <select
                  value={selectedTime1}
                  onChange={(e) => setSelectedTime1(e.target.value)}
                  style={dropdownStyle}
                >
                  <option value="">Select time</option>
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date and Time 2 */}
            <div style={formRowStyle}>
              <div style={halfInputWrapperStyle}>
                <label style={labelStyle}>วันที่ 2</label>
                <input
                  type="text"
                  value={
                    selectedDate2
                      ? selectedDate2.toLocaleDateString("th-TH")
                      : ""
                  }
                  onFocus={() => setActiveDateField("date2")}
                  placeholder="Select a date"
                  style={inputStyle}
                  readOnly
                />
              </div>
              <div style={halfInputWrapperStyle}>
                <label style={labelStyle}>เวลา</label>
                <select
                  value={selectedTime2}
                  onChange={(e) => setSelectedTime2(e.target.value)}
                  style={dropdownStyle}
                >
                  <option value="">Select time</option>
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date and Time 3 */}
            <div style={formRowStyle}>
              <div style={halfInputWrapperStyle}>
                <label style={labelStyle}>วันที่ 3</label>
                <input
                  type="text"
                  value={
                    selectedDate3
                      ? selectedDate3.toLocaleDateString("th-TH")
                      : ""
                  }
                  onFocus={() => setActiveDateField("date3")}
                  placeholder="Select a date"
                  style={inputStyle}
                  readOnly
                />
              </div>
              <div style={halfInputWrapperStyle}>
                <label style={labelStyle}>เวลา</label>
                <select
                  value={selectedTime3}
                  onChange={(e) => setSelectedTime3(e.target.value)}
                  style={dropdownStyle}
                >
                  <option value="">Select time</option>
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={fullRowStyle}>
              <div style={inputWrapperStyle}>
                <label style={labelStyle}>ผู้สัมภาษณ์ : </label>
                <input
                  type="text"
                  placeholder="Example : person1@gmail.com, person2@gmail.com"
                  style={inputStyle}
                  onChange={(e) => {
                    setInterviewVer(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Interview Format */}
            <div style={fullRowStyle}>
              <div style={inputWrapperStyle}>
                <label style={labelStyle}>รูปแบบการสัมภาษณ์</label>
                <select
                  value={interviewFormat}
                  onChange={(e) => setInterviewFormat(e.target.value)}
                  style={dropdownStyle}
                >
                  <option value="">Select format</option>
                  {interviewFormatOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ height: "80px" }}></div>
            <button
              type="submit"
              style={buttonStyle}
              onClick={handleSendAppointment}
            >
              Send
            </button>
          </div>

          <div style={calendarWrapperStyle}>
            <DatePicker
              selected={
                activeDateField === "date1"
                  ? selectedDate1
                  : activeDateField === "date2"
                  ? selectedDate2
                  : selectedDate3
              }
              onChange={handleDateChange}
              inline
              calendarClassName="custom-calendar"
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div style={headerStyle}>
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    style={navButtonStyle}
                  >
                    {"<"}
                  </button>
                  <span>
                    {date.toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    style={navButtonStyle}
                  >
                    {">"}
                  </button>
                </div>
              )}
            />
            <div>
              {filteredInterviewData.length > 0 ? (
                filteredInterviewData.map((interview) => (
                  <div key={interview.Time} style={listStyle}>
                    <h5 style={{ color: "black" }}>
                      {interview.PostId.Position}
                    </h5>
                    <p>ผู้สัมภาษณ์ {interview.InterviewVer}</p>

                    <p>
                      วันที่{" "}
                      {format(
                        parse(interview.Date, "dd/MM/yyyy", new Date()),
                        "d MMM yyyy"
                      )}{" "}
                      เวลา: {interview.Time}
                    </p>
                  </div>
                ))
              ) : (
                <p>ไม่มีนัดสัมภาษณ์งานในวันนี้</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const containerStyle = {
  margin: "40px",
  marginTop: "100px",
};

const formAndCalendarStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  animation: "fadeInFromBottom 1s ease-in",
  alignItems: "flex-start",
};
const formStyle = {
  display: "grid",
  gap: "20px",
  width: "50%",
};

const formRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
};

const fullRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  width: "100%",
};

const inputWrapperStyle = {
  flex: 1,
};

const halfInputWrapperStyle = {
  flex: 1,
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  color: "#333",
  fontSize: "16px",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "4px",
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

const dropdownStyle = {
  width: "100%",
  padding: "8px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#fff",
  backgroundColor: "#3769B4",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const calendarWrapperStyle = {
  justifyContent: "center",
  width: "40%",
  padding: "10px",
  borderRadius: "5px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "#4CAF50",
  color: "#fff",
};

const navButtonStyle = {
  cursor: "pointer",
  backgroundColor: "#4CAF50",
  border: "none",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
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

export default SendEmailPage;
