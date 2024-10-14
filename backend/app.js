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
const getPost = require('./services/post/getpost')
const getPostBySearch = require('./services/post/getPostBySearch');
const applyJobPost = require('./services/post/applyJobPost')
const getPostDetail = require('./services/post/getPostDetail')
const getAppliedJob = require('./services/post/getAppliedJob')
const closePost = require('./services/post/closePost')
const getClosePost = require('./services/post/getClosePost')
const openPost = require('./services/post/openPost')

const getMostMatchPost = require('./services/post/postMatch/getMostMatchPost')
const getMostMatchUser = require('./services/post/postMatch/getMostMatchUser')
const getMostMatchFromOutPost = require('./services/post/postMatch/getMostMatchFromOutPost')

//Appointment
const MakeAppointment = require('./services/appointment/MakeAppointment')
const CreateInterviewAppointment = require('./services/appointment/CreateInterviewAppointment')
const getAppointmentById = require('./services/appointment/getAppointmentById')

//User
const updateJobField = require('./services/users/updateJobField')

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
    return auth(req, res);
})

//Decoder token
app.get("/tokenDecoder/:token", async (req, res) => {
    return tokenDecoder(req, res);
})

app.patch("/resetPassword", async (req, res) => {
    return resetPassword(req,res)
})



//User
//Update JobField
app.patch("/UpdateJobField/:userId/:jobField", async (req, res) => {
    return updateJobField(req,res)
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
app.get("/checkValidResume/:userId", async (req, res) => {
    return checkValidResume(req, res);
})





//createPost
app.post("/createPost", async (req, res) => {
    return createPost(req,res);
})

//deletePost
app.delete("/deletePost/:idPost", async (req, res) => {
    return deletePost(req,res);
})

//getPost
app.get("/getPost/:userId", async (req,res) => {
    return getPost(req,res)
})

//getPostBySearch
app.get("/getPostBySearch/:textSearch/:location/:jobField", async (req, res) => {
    return getPostBySearch(req,res)
});

//applyPost
app.patch("/applyPost/:idPost/:idUser", async (req, res) => {
    return applyJobPost(req,res)
});

//getPostDetail
app.get("/getPostDetail/:idPost", async (req, res) => {
    return getPostDetail(req,res)
});

//getAppliedJob
app.get("/getAppliedJob/:userId", async (req, res) => {
    return getAppliedJob(req,res)
});

//getMostMatchPost
app.get("/getMostMatchPost/:Location/:WorkField/:userId", async (req, res) => {
    return getMostMatchPost(req,res)
});

//getMostMatchUser
app.get("/getMostMatchUser/:IdPost", async (req, res) => {
    return getMostMatchUser(req,res)
});

//getMostMatchFromOutPost
app.get("/getMostMatchFromOutPost/:IdPost", async (req, res) => {
    return getMostMatchFromOutPost(req,res)
});

//closePost
app.patch("/closePost/:idPost", async (req, res) => {
    return closePost(req,res)
});

//getClosePost
app.get("/getClosePost/:userId", async (req, res) => {
    return getClosePost(req,res)
});

//openPost
app.patch("/openPost/:idPost", async (req, res) => {
    return openPost(req,res)
});






//Appointment
//MakeAppointment
app.post("/makeAppointment/:userId/:idPost", async (req, res) => {
    return MakeAppointment(req,res)
});

//CreateInterviewAppointment
app.post("/CreateInterviewAppointment", async (req, res) => {
    return CreateInterviewAppointment(req,res)
})

//getAppointmentById
app.get("/getAppointmentById/:userId", async (req, res) => {
    return getAppointmentById(req,res)
})


  


//Email
app.post("/sendOTP", async (req, res) => {
    return sendOTP(req,res)
})

module.exports = app;