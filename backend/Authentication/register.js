const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const verifyRegister = async (req , res) => {
    try{

        let {first_name, last_name, email, password, location, role, jobField, companyName, companyDetail} = req.body;
        email = email.toLowerCase();
        if(companyName == null){
            companyName == "-"
        }
        if(companyDetail == null){
            companyDetail == "-"
        }
        if(jobField == null){
            jobField == "-"
        }

        //validate user input
        if(!(email && password && first_name && last_name && location && role)){
            return res.status(400).json({
                message: 'กรุณากรอกข้อมูลให้ครบ'
            })
        }

        //Validate user in our database
        const Validate = await User.findOne({email: email});
            if(Validate){
                return res.status(400).json({
                    message: 'อีเมลนี้มีผู้ใช้แล้ว'
                })
            }

        //Encryption Password
        encryptedPassword = await bcrypt.hash(password,10);

        //Create user in our database
        const user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: role,
            location: location,
            jobField: jobField,
            companyName: companyName,
            companyDetail: companyDetail
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
        res.status(200).json(user);

    } catch (err){
        return res.status(400).json({
            message: `internal server error :${err}`
        })
    }
}

module.exports = verifyRegister;