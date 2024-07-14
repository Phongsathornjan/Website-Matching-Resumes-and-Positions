const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const verifyLogin = async (req , res) => {

    try{

        //Get user input
        let {email, password} = req.body;

        //Validate user input
        if(!(email && password)){
            return res.status(400).json({
                message: 'Please enter your Email and Password'
            })
        }

        email = email.toLowerCase();

        //Validate user in our database
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                message: 'Invalid user or password'
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
            return res.status(200).json({
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                phone: user.phone,
                company_name: user.company_name,
                token: user.token
            });
        }else{
            return res.status(400).json({
                message: 'Invalid user or password'
            })
        }


    } catch(err){
        console.log(err);
    }
}

module.exports = verifyLogin;