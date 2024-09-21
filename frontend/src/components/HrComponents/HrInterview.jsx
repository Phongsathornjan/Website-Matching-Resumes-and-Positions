import React, { useState,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppointmentsPage() {

  useEffect(() => {
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

  const appointments = [
    {title: "ตำแหน่ง .....", date: new Date(2024, 8, 15),time: '8:00 - 10:00', MeetingLink : '-',Interviewer: 'Phongsathornjanjamsai@gmail.com , passakorn@gmail.com'},
    {title: "ตำแหน่ง .....", date: new Date(2024, 8, 16),time: '13:00 - 14:00', MeetingLink : 'onsite',Interviewer: 'Phongsathornjanjamsai@gmail.com , passakorn@gmail.com'},
    {title: "ตำแหน่ง .....", date: new Date(2024, 8, 16),time: '8:00 - 10:00', MeetingLink : '-',Interviewer: 'Phongsathornjanjamsai@gmail.com , passakorn@gmail.com'},
    {title: "ตำแหน่ง .....", date: new Date(2024, 8, 17),time: '13:00 - 14:00', MeetingLink : '-',Interviewer: 'Phongsathornjanjamsai@gmail.com , passakorn@gmail.com'},
    {title: "ตำแหน่ง .....", date: new Date(2024, 8, 17),time: '12:00 - 13:00', MeetingLink : '-',Interviewer: 'Phongsathornjanjamsai@gmail.com , passakorn@gmail.com'},
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const filteredData = appointments.filter(
    (appointments) => format(appointments.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );


  return (
    <div style={{animation: 'fadeInFromBottom 0.6s ease-in'}}>
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
      <div style={{height: "20px"}}></div>
      {filteredData.length > 0 ? (
          filteredData.map((appointments) => (
            <Card
              key={appointments.time}
              style={cardStyle}
            >
              <Card.Body>
              <Card.Title style={ellipsisStyle}>{appointments.title}</Card.Title>
              <Card.Text style={ellipsisStyle}>วันที่ {format(appointments.date, 'd MMM yyyy')} เวลา : {appointments.time}</Card.Text>
              <Card.Text style={ellipsisStyle}>ผู้สัมภาษณ์ : {appointments.Interviewer}</Card.Text>
              <div style={{display: 'flex',justifyContent: 'space-between'}}>
                <Card.Text style={ellipsisStyle}>Meeting Link : {appointments.MeetingLink}</Card.Text>
                <div style={{width: '350px',display: 'flex'}}>
                <Link to={'#'}>
                  <Button variant="primary" style={ButtonStyle}>Resume</Button>
                </Link>
                <div style={{width: '50px'}}></div>
                <Link to={'#'}>
                  <Button variant="success" style={ButtonStyle}>More Appointment</Button>
                </Link>
                </div>
              </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <center>
            <p style={{fontSize: '20px',color: 'gray',marginTop: '25px'}}>ไม่มีนัดสัมภาษณ์งานในวันนี้</p>  
          </center>
        )}
    </div>
  );
}

const ellipsisStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',        
  textOverflow: 'ellipsis'     
};


const cardStyle = {
  width: '1000px',
  borderRadius: '20px',
  animation: 'fadeInFromBottom 0.6s ease-in',
  marginBottom: '15px'
};

const ButtonStyle = {
  padding: '8px 20px',
  fontSize: '14px',
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
