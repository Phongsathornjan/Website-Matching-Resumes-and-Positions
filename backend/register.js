const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const verifyRegister = async (req , res) => {
    try{

        let {first_name, last_name, email, password, phone, token} = req.body;
        email = email.toLowerCase();

        //validate user input
        if(!(email && password && first_name && last_name && phone)){
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
            first_name: first_name,
            last_name: last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: 'member',
            company_name: '-',
            phone: phone,
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
}

module.exports = verifyRegister;