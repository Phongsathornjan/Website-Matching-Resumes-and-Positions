const User = require('../../model/user');
const mongoose = require('mongoose');

const updateJobField = async (req,res) => {
    try{
        const {userId,jobField} = req.params;
        if(!userId || !jobField){
            return res.status(400).json({
                message: 'Not found userId'
            })
        }
    
        const Update = await User.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(userId) }, // เงื่อนไขในการค้นหาผู้ใช้
            { $set: { jobField: jobField } }
        );
    
        if (Update) {
            return res.status(200).json({
                message: 'Success'
            })
        } else {
            return res.status(400).json({
                message: 'Error Update'
            })
        }
    }catch(err){
        console.log(err)
        return res.status(400).json({
            message: 'Internal server error'
        })
    }
}

module.exports = updateJobField