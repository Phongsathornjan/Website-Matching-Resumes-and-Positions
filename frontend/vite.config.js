import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // ฟังการเชื่อมต่อจากทุก IP
    port: 5173,        // พอร์ตที่ใช้
    proxy: {
      // Proxy ทุกเส้นทางที่เริ่มต้นด้วย '/api' ไปยัง backend ที่รันใน localhost หรือ EC2
      '/register': 'http://localhost:4001',
      '/login': 'http://localhost:4001',
      '/auth': 'http://localhost:4001',
      '/tokenDecoder': 'http://localhost:4001',
      '/resetPassword': 'http://localhost:4001',
      '/handleRegister': 'http://localhost:4001',
      '/UpdateJobField': 'http://localhost:4001',
      '/getInformation': 'http://localhost:4001',
      '/updateInformation': 'http://localhost:4001',
      '/uploadPDF': 'http://localhost:4001',
      '/checkValidResume': 'http://localhost:4001',
      '/createPost': 'http://localhost:4001',
      '/deletePost': 'http://localhost:4001',
      '/getPost': 'http://localhost:4001',
      '/getPostBySearch': 'http://localhost:4001',
      '/applyPost': 'http://localhost:4001',
      '/getPostDetail': 'http://localhost:4001',
      '/getAppliedJob': 'http://localhost:4001',
      '/getMostMatchPost': 'http://localhost:4001',
      '/getMostMatchUser': 'http://localhost:4001',
      '/getMostMatchFromOutPost': 'http://localhost:4001',
      '/closePost': 'http://localhost:4001',
      '/getClosePost': 'http://localhost:4001',
      '/openPost': 'http://localhost:4001',
      '/getUserInPostBySearch': 'http://localhost:4001',
      '/makeAppointment': 'http://localhost:4001',
      '/CreateInterviewAppointment': 'http://localhost:4001',
      '/getAppointmentById': 'http://localhost:4001',
      '/sendOTP': 'http://localhost:4001',
    },
  },
});
