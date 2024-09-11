require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const cors = require('cors');

//Authentication
const verifyLogin = require('./Authentication/login');
const verifyRegister =require('./Authentication/register');
const auth = require('./middleware/auth');
const tokenDecoder = require('./Authentication/tokenDecoder');
const resetPassword = require('./Authentication/resetPassword');

//Resume
const checkValidResume = require('./checkValidResume');
const upload = require('./uploadPDF');
const uploadPDF2mongo = require('./uploadPDF2mongo');

//Post
const createPost = require('./services/post/createpost');
const deletePost = require('./services/post/deletepost');

//email
const sendOTP = require('./services/email/sendOTP');

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
app.post("/uploadPDF", upload.single('file'),async (req, res) => {
    try {
        const userId = req.body.id;
        await uploadPDF2mongo(userId);
        return res.status(200).json({ message: 'File uploaded successfully!', file: req.file,userId});
    } catch (error) {
        return res.status(500).json({ message: 'Failed to upload file.', error: error.message });
    }
})

//checkValidResume
app.post("/checkValidResume", async (req, res) => {
    return checkValidResume(req, res);
})

//createPost
app.post("/createPost", async (req, res) => {
    return createPost(req,res);
})

//deletePost
app.post("/deletePost", async (req, res) => {
    return deletePost(req,res);
})

//Email
app.post("/sendOTP", async (req, res) => {
    return sendOTP(req,res)
})

app.patch("/resetPassword", async (req, res) => {
    return resetPassword(req,res)
})


module.exports = app;