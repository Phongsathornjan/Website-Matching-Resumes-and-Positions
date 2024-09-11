import React, { useEffect } from 'react';
import HRNavbar from '../components/navbar/HRNavbar';
import Bottombar from './../components/navbar/Bottombar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const SendEmailPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function authentication() {
      try{
        let token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:4001/auth', {} ,{
          headers: {
            'x-access-token': token
          }
        })

        if(response.status == 200){
          if(response.data.userData.role != "hr"){
            navigate('/SignIn');
          }
        }

      } catch(err){
        console.log(err)
      }
    }
   
    authentication();

  }, []);


  const [selectedDate1, setSelectedDate1] = React.useState(null);
  const [selectedDate2, setSelectedDate2] = React.useState(null);
  const [selectedDate3, setSelectedDate3] = React.useState(null);
  const [selectedTime1, setSelectedTime1] = React.useState('');
  const [selectedTime2, setSelectedTime2] = React.useState('');
  const [selectedTime3, setSelectedTime3] = React.useState('');
  const [interviewFormat, setInterviewFormat] = React.useState('');
  const [activeDateField, setActiveDateField] = React.useState(null);

  const timeOptions = [
    { value: '09:00 - 10:00', label: '09:00 - 10:00' },
    { value: '10:00 - 11:00', label: '10:00 - 11:00' },
    { value: '11:00 - 12:00', label: '11:00 - 12:00' },
    { value: '13:00 - 14:00', label: '13:00 - 14:00' },
    { value: '14:00 - 15:00', label: '14:00 - 15:00' },
    { value: '15:00 - 16:00', label: '15:00 - 16:00' },
    { value: '16:00 - 17:00', label: '16:00 - 17:00' },
    { value: '17:00 - 18:00', label: '17:00 - 18:00' },
  ];

  const interviewFormatOptions = [
    { value: 'onsite', label: 'Onsite' },
    { value: 'online', label: 'Online' },
  ];

  const handleDateChange = (date) => {
    if (activeDateField === 'date1') setSelectedDate1(date);
    if (activeDateField === 'date2') setSelectedDate2(date);
    if (activeDateField === 'date3') setSelectedDate3(date);
  };

  return (
    <>
      <HRNavbar />
        <div style={containerStyle}>
          <h1 style={titleStyle}>Send Email</h1>
          <div style={formAndCalendarStyle}>
            <form style={formStyle}>
              <div style={fullRowStyle}>
                <div style={inputWrapperStyle}>
                  <label style={labelStyle}>Meeting link :</label>
                  <input
                    type="text"
                    placeholder="Enter the meeting link"
                    style={inputStyle}
                  />
                </div>
              </div>
              {/* Date and Time 1 */}
              <div style={formRowStyle}>
                <div style={halfInputWrapperStyle}>
                  <label style={labelStyle}>วันที่ 1</label>
                  <input
                    type="text"
                    value={selectedDate1 ? selectedDate1.toLocaleDateString('th-TH') : ''}
                    onFocus={() => setActiveDateField('date1')}
                    placeholder="Select a date"
                    style={inputStyle}
                    readOnly
                  />
                </div>
                <div style={halfInputWrapperStyle}>
                  <label style={labelStyle}>เวลา</label>
                  <select 
                    value={selectedTime1} 
                    onChange={e => setSelectedTime1(e.target.value)} 
                    style={dropdownStyle}
                  >
                    <option value="">Select time</option>
                    {timeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
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
                    value={selectedDate2 ? selectedDate2.toLocaleDateString('th-TH') : ''}
                    onFocus={() => setActiveDateField('date2')}
                    placeholder="Select a date"
                    style={inputStyle}
                    readOnly
                  />
                </div>
                <div style={halfInputWrapperStyle}>
                  <label style={labelStyle}>เวลา</label>
                  <select 
                    value={selectedTime2} 
                    onChange={e => setSelectedTime2(e.target.value)} 
                    style={dropdownStyle}
                  >
                    <option value="">Select time</option>
                    {timeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
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
                    value={selectedDate3 ? selectedDate3.toLocaleDateString('th-TH') : ''}
                    onFocus={() => setActiveDateField('date3')}
                    placeholder="Select a date"
                    style={inputStyle}
                    readOnly
                  />
                </div>
                <div style={halfInputWrapperStyle}>
                  <label style={labelStyle}>เวลา</label>
                  <select 
                    value={selectedTime3} 
                    onChange={e => setSelectedTime3(e.target.value)} 
                    style={dropdownStyle}
                  >
                    <option value="">Select time</option>
                    {timeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Interview Format */}
              <div style={fullRowStyle}>
                <div style={inputWrapperStyle}>
                  <label style={labelStyle}>รูปแบบการสัมภาษณ์</label>
                  <select 
                    value={interviewFormat} 
                    onChange={e => setInterviewFormat(e.target.value)} 
                    style={dropdownStyle}
                  >
                    <option value="">Select format</option>
                    {interviewFormatOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" style={buttonStyle}>Send</button>
            </form>

            <div style={calendarWrapperStyle}>
              <DatePicker
                selected={activeDateField === 'date1' ? selectedDate1 : activeDateField === 'date2' ? selectedDate2 : selectedDate3}
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
                    <span>{date.toLocaleString("en-US", { month: "long", year: "numeric" })}</span>
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
            </div>
          </div>
        </div>
      <Bottombar />
    </>
  );
};



const containerStyle = {
  margin: '40px',
  marginTop: '100px',
};

const titleStyle = {
  color: '#3769B4',
  fontFamily: 'Trirong',
  fontSize: '48px',
  fontWeight: 'bold',
  marginBottom: '30px',
};

const formAndCalendarStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  alignItems: 'flex-start',
};
const formStyle = {
  display: 'grid',
  gap: '20px',
  width: '50%',
};

const formRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
};

const fullRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  width: '100%',
};

const inputWrapperStyle = {
  flex: 1,
};

const halfInputWrapperStyle = {
  flex: 1,
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const dropdownStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#3769B4',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const calendarWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40%',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '10px',
  borderRadius: '5px',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#4CAF50',
  color: '#fff',
};

const navButtonStyle = {
  cursor: 'pointer',
  backgroundColor: '#4CAF50',
  border: 'none',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
};

const customCalendarStyle = {
  '.react-datepicker': {
    fontFamily: 'Arial, sans-serif',
  },
  '.react-datepicker__header': {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  '.react-datepicker__day': {
    color: '#4CAF50',
  },
  '.react-datepicker__day:hover': {
    backgroundColor: '#66BB6A',
    color: '#fff',
  },
  '.react-datepicker__day--selected, .react-datepicker__day--selected:hover': {
    backgroundColor: '#388E3C',
    color: '#fff',
  },
  '.react-datepicker__day--today': {
    backgroundColor: '#2E7D32',
    color: '#fff',
  },
};

export default SendEmailPage;
