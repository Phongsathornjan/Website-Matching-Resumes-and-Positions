const fs = require('fs');

const checkValidResume = async (req, res) => {
    try{
        const {userId} = req.params;
        if(userId){
            const filePath = `../frontend/public/Resume/${userId}-1.jpg`;
            if (fs.existsSync(filePath)) {
                return res.status(200).json({
                    message: 'found resume'
                })
              } else {
                return res.status(400).json({
                    message: 'Resume not found'
                })
              }
        }else{
            return res.status(400).json({
                message: 'Invalid userId'
            })
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = checkValidResume;