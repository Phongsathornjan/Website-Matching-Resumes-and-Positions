const fs = require('fs');

const checkValidResume = async (req, res) => {
    try{
        const {id_user} = req.body;
        if(id_user){
            const filePath = `../frontend/public/Resume/${id_user}-1.jpg`;
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
                message: 'Invalid id_user'
            })
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = checkValidResume;