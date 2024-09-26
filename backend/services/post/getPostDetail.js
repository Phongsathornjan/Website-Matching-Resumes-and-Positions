const Post = require('../../model/post');
const User = require('../../model/user')

const getPostDetail = async (req, res) => {
    const {idPost} = req.params
    if(!idPost){
        return res.status(400).json({
            message: 'ID post not found'
        })
    }

    try{
        const result = await Post.findById(idPost).lean(); 
        if(result){
            const companyDetail = await User.findById(result.userId)
            result.companyName = companyDetail.companyName
            result.companyDetail = companyDetail.companyDetail
            console.log(result)
            return res.status(200).json(result)
        }else{
            return res.status(400).json({
                message: "Internal Server Error"
            });
        }
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = getPostDetail