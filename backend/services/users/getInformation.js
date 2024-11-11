const User = require('../../model/user');
const mongoose = require('mongoose');

const getInformation = async (req ,res) => {
    const {userId} = req.params

    try{
        if(!userId){
            return res.status(400).json({
                message: 'not found userId'
            })
        }
        const result = await User.findById(userId).select('-password -role  ');
        return res.status(200).json({
            message: "success",
            data: result
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            message: 'Internal server error'
        })
    }
}

module.exports = getInformation;