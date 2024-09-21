import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dataPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  const interviewData = [
    {
      title: 'IT Support',
      company: 'บริษัท kmutnb กรุงเทพมหานคร',
      date: new Date(2024, 8, 19),
      time: '10:00 - 11:00',
      MeetingLink: 'msTeam',
    },
    {
      title: 'Dev Ops',
      company: 'บริษัท kmutnb กรุงเทพมหานคร',
      date: new Date(2024, 8, 15), 
      time: '13:00 - 14:00',
      MeetingLink: 'Onsite',
    },
    {
      title: 'Frontend Developer',
      company: 'บริษัท ABC กรุงเทพมหานคร',
      date: new Date(2024, 8, 15), 
      time: '09:00 - 10:00',
      MeetingLink: 'Zoom',
    },
    {
      title: 'Frontend Developer',
      company: 'บริษัท ABC กรุงเทพมหานคร',
      date: new Date(2024, 8, 15), 
      time: '10:00 - 11:00',
      MeetingLink: 'Zoom',
    },
    {
      title: 'Frontend Developer',
      company: 'บริษัท ABC กรุงเทพมหานคร',
      date: new Date(2024, 8, 15), 
      time: '10:00 - 11:00',
      MeetingLink: 'Zoom',
    },
    {
      title: 'Frontend Developer',
      company: 'บริษัท ABC กรุงเทพมหานคร',
      date: new Date(2024, 8, 21), 
      time: '10:00 - 11:00',
      MeetingLink: 'Zoom',
    }
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  
  const handleNext = () => {
    if (currentPage < totalPages) {
      setTimeout(function() {
        window.scrollTo({
          top: 680,        
          behavior: 'smooth' 
        });
      }, 100);  
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setTimeout(function() {
        window.scrollTo({
          top: 680,        
          behavior: 'smooth' 
        });
      }, 100);  
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredData = interviewData.filter(
    (interview) => format(interview.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / dataPerPage))
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / dataPerPage))
  }, [filteredData]);

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

  return (
    <div style={{marginTop: '20px'}}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        dateFormat="MMMM d, yyyy"
      />

      <div style={{ marginTop: '20px' }}>
        {currentData.length > 0 ? (
          currentData.map((interview) => (
            <div
              key={interview.time}
              style={listStyle}
            >
              <h3 style={{color: 'black'}}>{interview.title}</h3>
              <p>{interview.company}</p>
              <p>วันที่ {format(interview.date, 'd MMM yyyy')} เวลา: {interview.time}</p>
              <p>Meeting Link : {interview.MeetingLink}</p>
            </div>
          ))
        ) : (
          <p>ไม่มีนัดสัมภาษณ์งานในวันนี้</p>
        )}
        <div style={SlideNavigation}>
          <button style={NavigationButton} onClick={handlePrev} disabled={currentPage === 1}>
            {'<'}
          </button>
          {currentData == 0 ? (
            <div>Page {currentPage-1} of {totalPages}</div>
          ):(
            <div>Page {currentPage} of {totalPages}</div>
          )}
          <button style={NavigationButton} onClick={handleNext} disabled={currentPage === totalPages}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

const listStyle = {
  padding: '10px',
  backgroundColor: '#fff',
  marginBottom: '10px',
  border: 'solid 1px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  width: '440px',
  animation: 'fadeInFromBottom 0.5s ease-in'
}

const NavigationButton = {
  backgroundColor: '#fff',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  border: 'none',
  margin: '0 10px',
  position: 'relative',
};

const SlideNavigation = {
  display: 'flex',
  marginLeft: '150px',
  marginTop: '25px',
  position: 'relative'
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
