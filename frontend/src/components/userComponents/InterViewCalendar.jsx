import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const interviewData = [
    {
      id: 1,
      title: 'IT Support',
      company: 'บริษัท kmutnb กรุงเทพมหานคร',
      date: new Date(2024, 8, 19),
      time: '10:00 - 11:00',
      location: 'msTeam',
    },
    {
      id: 2,
      title: 'Dev Ops',
      company: 'บริษัท kmutnb กรุงเทพมหานคร',
      date: new Date(2024, 8, 15), 
      time: '13:00 - 14:00',
      location: 'Onsite',
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'บริษัท ABC กรุงเทพมหานคร',
      date: new Date(2024, 8, 16), 
      time: '09:00 - 10:00',
      location: 'Zoom',
    }
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredData = interviewData.filter(
    (interview) => format(interview.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div style={{marginTop: '20px'}}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        dateFormat="MMMM d, yyyy"
      />

      <div style={{ marginTop: '20px' }}>
        {filteredData.length > 0 ? (
          filteredData.map((interview) => (
            <div
              key={interview.id}
              style={{
                padding: '10px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                marginBottom: '10px',
                boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
              }}
            >
              <h3>{interview.title}</h3>
              <p>{interview.company}</p>
              <p>วันที่ {format(interview.date, 'd MMM yyyy')} เวลา: {interview.time}</p>
              <p>สถานที่: {interview.location}</p>
            </div>
          ))
        ) : (
          <p>ไม่มีนัดสัมภาษณ์งานในวันนี้</p>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
