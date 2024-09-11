const bcrypt = require('bcryptjs');
const User = require('../model/user');

const resetPassword = async (req, res) => {

        try{
            let {email, newPassword} = req.body;
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const newEmail = email.toLowerCase();
            const updatedUser = await User.findOneAndUpdate(
                { email: newEmail }, // เงื่อนไขในการค้นหาผู้ใช้
                { $set: { password: hashedPassword } },
                { new: true } // This will return the updated document
            );

            if (updatedUser) {
                return res.status(200).json({
                    message: 'Success'
                })
            } else {
                return res.status(400).json({
                    message: 'Error Update Password'
                })
            }

        }catch(err){
            console.log(err)
            return res.status(400).json({
                message: 'Error internal server'
            })
        }
}

module.exports = resetPassword;

