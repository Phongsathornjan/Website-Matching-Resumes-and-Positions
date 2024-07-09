require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

//Register
app.post("/register", async (req, res) =>{
    try{

        const {first_name, last_name, email, password, token} = req.body;

        //validate user input
        if(!(email && password && first_name && last_name)){
            res.status(400).send("All input is required");
        }

        //Encryption Password
        encryptedPassword = await bcrypt.hash(password,10);

        //Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        //Create token
        const Token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        // save user token
        user.token = Token;

        //return new user
        res.status(201).json(user);

    } catch (err){
        //Validate if user is exist in our database
        if(err.errorResponse.code == 11000){
            res.status(409).send("This email is already exist");
        }
    }
})

//Login
app.post("/login", async (req, res) => {
    
    try{

        //Get user input
        let {email, password} = req.body;
        email = email.toLowerCase();

        //Validate user input
        if(!(email && password)){
            res.status(400).send('Please Enter your Email and Password');
        }

        //Validate user in our database
        const user = await User.findOne({email: email});
        if(!user){
            res.status(400).send("Invalid user");
        }

        if( user && (await bcrypt.compare(password,user.password))){
            const Token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )

            user.token = Token;
            res.status(200).json(user);
        }


    } catch(err){
        console.log(err);
    }
})

module.exports = app;