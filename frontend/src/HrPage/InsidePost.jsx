import React from 'react';
import HRNavbar from './../components/navbar/HRNavbar';

const InsidePost = () => {
  const candidates = [
    { name: 'พงศกร จันทร์แจ่มใส', age: 21, position: 'Developer', skill: 'JavaScript , JavaScript , JavaScript , JavaScript , JavaScript , JavaScript', match: 98 },
    { name: 'ภาสกร วรรณชะนะ', age: 22, position: 'Designer', skill: 'UI/UX , UI/UX , UI/UX , UI/UX , UI/UX , UI/UX', match: 95 },
    { name: 'วีรภัทร กลัดเล็ก', age: 23, position: 'Analyst', skill: 'Data Analysis , Data Analysis , Data Analysis , Data Analysis , Data Analysis , Data Analysis', match: 90 },
    { name: 'พิชิตพล น้อยท่าทอง', age: 24, position: 'Engineer', skill: 'DevOps , DevOps , DevOps , DevOps , DevOps , DevOps , DevOps', match: 87 },
    { name: 'ภัทรพล พวงงาม', age: 25, position: 'Manager', skill: 'Project Management , Project Management , Project Management , Project Management , Project Management , Project Management ,Project Management', match: 85 },
    { name: 'เอกพล แก้วก้อนน้อย', age: 26, position: 'Tester', skill: 'Automation Testing', match: 82 },
    { name: 'จักรธร สิทธิธรรม', age: 27, position: 'Support', skill: 'Technical Support', match: 72 },
  ];

  return (
    <>
    <HRNavbar />
    <div style={{ height: "100px" }}></div>
    <div style={styles.pageContainer}>
      <section style={styles.searchSection}>
        <h2>หาผู้สมัครที่คุณต้องการได้ที่นี่</h2>
        <div style={{ height: "20px" }}></div>
        <input
          type="text"
          placeholder="Find candidates who ...... ? "
          style={styles.searchInput}
        />
        <div style={styles.emailList}>
          <p>Phongsathorn@gmail.com</p>
          <p>Passakorn@gmail.com</p>
          <p>Channarong@gmail.com</p>
        </div>
      </section>
      <div style={{ height: "20px" }}></div>
      <section style={styles.candidatesSection}>
        <div style={styles.candidatesList}>
          <h3>รายชื่อผู้สมัคร</h3>
          <div style={{ height: "30px" }}></div>
          {candidates.map((candidate, index) => (
            <div key={index} style={styles.candidateCard}>
              <div style={styles.candidateDetails}>
                <p><strong>Name:</strong> {candidate.name}</p>
                <p><strong>Age:</strong> {candidate.age} | <strong>Position:</strong> {candidate.position}</p>
                <p><strong>Skill:</strong> {candidate.skill}</p>
              </div>
              <div style={styles.candidateActions}>
                <span style={{ ...styles.matchBadge, backgroundColor: getMatchColor(candidate.match) }}>
                  Match {candidate.match}%
                </span>
                <button style={styles.interviewButton}>Interview appointment</button>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.resumePreview}>
        </div>
      </section>
    </div>
    </>
  );

};

// Function to determine match color based on percentage
const getMatchColor = (match) => {
  if (match >= 90) return '#D738F6';
  if (match >= 75) return '#F66B38';
  return '#7F7D89';
};

const styles = {
  pageContainer: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  searchSection: {
    margin: '20px 0',
    textAlign: 'center',
  },
  searchInput: {
    width: '60%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  },
  emailList: {
    backgroundColor: '#f0f4c3',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    textAlign: 'left',
    margin: '0 auto',
    width: '60%',
  },
  candidatesSection: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  candidatesList: {
    width: '50%',
    marginLeft: '75px', // เพิ่ม margin ซ้าย
  },
  candidateCard: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  candidateDetails: {
    textAlign: 'left',
    flex: 1,
  },
  candidateActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '150px',
    marginLeft: '15px',
  },
  interviewButton: {
    padding: '10px 15px',
    backgroundColor: '#65BDE7',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
  },
  matchBadge: {
    padding: '5px 10px',
    color: '#fff',
    borderRadius: '8px',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    marginBottom: '25px',
  },
  resumePreview: {
    marginTop: '70px', //
    height: '750px',
    width: '500px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    marginRight: '75px', // เพิ่ม margin ขวา
  },
  resumePlaceholderText: {
    fontSize: '18px',
    color: '#9e9e9e',
  },
};

export default InsidePost;
