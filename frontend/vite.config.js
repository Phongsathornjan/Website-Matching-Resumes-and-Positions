import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // ฟังการเชื่อมต่อจากทุก IP
    port: 5173,        // พอร์ตที่ใช้
    proxy: {
      '/': {
        target: 'http://localhost:4001', // URL ของ backend ที่รันใน EC2 (ให้ใช้ localhost ถ้ารันบนเครื่องเดียวกัน)
        changeOrigin: true,
        secure: false,
      },
    },
  },
})