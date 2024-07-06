import React from 'react';
import HRNavbar from './HRNavbar';
import StatusCard from './StatusCard';
import AppointmentList from './InterviewList';
import { FaBriefcase, FaCalendarCheck, FaUsers } from 'react-icons/fa';

const HRDashboard = () => {
  return (
    <div style={dashboardStyle}>
      <HRNavbar />
      <div style={statusContainerStyle}>
        <StatusCard
          title="Job"
          count="8"
          color="#9d8ee1"
          icon={<FaBriefcase />}
        />
        <StatusCard
          title="Interview"
          count="16"
          color="#f1c40f"
          icon={<FaCalendarCheck />}
        />
        <StatusCard
          title="Applicant"
          count="9"
          color="#2ecc71"
          icon={<FaUsers />}
        />
      </div>
      <div style={separatorStyle}></div>
      <AppointmentList />
    </div>
  );
};

const dashboardStyle = {
  padding: '20px',
};

const statusContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
};

const separatorStyle = {
  height: '2px',
  backgroundColor: '#ccc',
  marginBottom: '20px',
};

export default HRDashboard;
