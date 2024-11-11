const User = require('../../model/user');

const updateInformation = async (req,res) => {
    const {userId} = req.params
    const { first_name, last_name, location, jobField, companyName, companyDetail, } = req.body;
    try{
        let result = {}
        if(companyName){
            result = await User.findOneAndUpdate(
                { _id: userId }, 
                { $set: { companyName, companyDetail } },  
                { new: true }
            )            
        }else{
            result = await User.findOneAndUpdate(
                { _id: userId }, 
                { $set: { first_name, last_name, location, jobField } },  
                { new: true }
            )
        }
        return res.status(200).json({
            message: 'success',
            result
        })
    }catch(e){
        console.log(e)
        return res.status(400).json({
            message: 'Internal server error'
        })
    }
}

module.exports = updateInformation