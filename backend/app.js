require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const verifyLogin = require('./login');
const verifyRegister =require('./register');
const auth = require('./middleware/auth');
const tokenDecoder = require('./tokenDecoder');
const checkValidResume = require('./checkValidResume');
const cors = require('cors');
const upload = require('./uploadPDF');
const uploadPDF2mongo = require('./uploadPDF2mongo');
const path = require('path');
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'Resume')));

//Register
app.post("/register", async (req, res) =>{
    return verifyRegister(req,res);
})

//Login
app.post("/login", async (req, res) => {
    return verifyLogin(req, res);
})

// Auth
app.post("/auth", async (req, res) =>{
    return auth(req, res, () => {
        res.status(200).json({ message: "Authenticated" });
    });
})

//Decoder token
app.post("/tokenDecoder", async (req, res) => {
    return tokenDecoder(req, res);
})

//uploadPDF
app.post("/uploadPDF", upload.single('file'),(req, res) => {
    try {
        const userId = req.body.id;
        uploadPDF2mongo(userId);
        res.status(200).json({ message: 'File uploaded successfully!', file: req.file,userId});
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload file.', error: error.message });
    }
})

//checkValidResume
app.post("/checkValidResume", async (req, res) => {
    return checkValidResume(req, res);
})

module.exports = app;