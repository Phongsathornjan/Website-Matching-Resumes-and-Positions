const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// กำหนดที่เก็บไฟล์
const uploadDirectory = path.join(__dirname, '../frontend/public/Resume');

// สร้างโฟลเดอร์สำหรับเก็บไฟล์ถ้ายังไม่มี
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// ตั้งค่า multer เพื่อจัดการการอัพโหลดไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, 'Resume.pdf'); // ใช้ชื่อไฟล์เดิม
    }
});

const upload = multer({ storage: storage });

module.exports = upload;