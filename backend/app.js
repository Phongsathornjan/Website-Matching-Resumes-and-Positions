require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const verifyLogin = require('./login');
const verifyRegister =require('./register');

const app = express();
app.use(express.json());

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