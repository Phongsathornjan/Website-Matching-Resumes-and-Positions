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

        let {first_name, last_name, email, password, token} = req.body;
        email = email.toLowerCase();

        //validate user input
        if(!(email && password && first_name && last_name)){
            return res.status(400).json({
                message: 'All input is require'
            })
        }

        //Validate user in our database
        const Validate = await User.findOne({email: email});
            if(Validate){
                return res.status(400).json({
                    message: 'This email is already exits'
                })
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
        console.log(err);
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
            return res.status(400).json({
                message: 'Please enter your Email and Password'
            })
        }

        //Validate user in our database
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                message: 'Invalid user'
            })
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
            return res.status(200).json(user);
        }


    } catch(err){
        console.log(err);
    }
})

module.exports = app;