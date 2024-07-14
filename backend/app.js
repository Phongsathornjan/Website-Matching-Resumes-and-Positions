require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const verifyLogin = require('./login');
const verifyRegister =require('./register');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200
  };

app.use(cors(corsOptions));
app.use(express.json());

//Register
app.post("/register", async (req, res) =>{
    return verifyRegister(req,res);
})

//Login
app.post("/login", async (req, res) => {
    return verifyLogin(req, res);
})

module.exports = app;