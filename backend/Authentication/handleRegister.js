const User = require('../model/user');

const handleRegister = async (req , res) => {
    try{
        let {first_name, last_name, email, password, location} = req.body;
        //validate user input
        if(!(email && password && first_name && last_name && location)){
            return res.status(400).json({
                message: 'กรุณากรอกข้อมูลให้ครบ'
            })
        }

        email = email.toLowerCase();
        //Validate user in our database
        const Validate = await User.findOne({email: email});
            if(Validate){
                return res.status(400).json({
                    message: 'อีเมลนี้มีผู้ใช้แล้ว'
                })
            }
        
            return res.status(200).json({message: 'success'})

    } catch (err){
        return res.status(400).json({
            message: `internal server error :${err}`
        })
    }
}

module.exports = handleRegister;