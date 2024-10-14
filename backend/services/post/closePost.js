const Post = require('../../model/post');

const closePost = async (req, res) => {
    const { idPost } = req.params
    if(!idPost){
        return res.status(400).json({
            message: 'ID post not found'
        })
    }

    try{
        const updateStatus = await Post.findOneAndUpdate(
            { _id: idPost },        
            { status: "close" }, 
            { new: true, upsert: false }
        )
        if(updateStatus == null){
            return res.status(400).json({
                message: "Not found post"
            });
        }
        return res.status(200).json({
            updateStatus,
            message: "success"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "internal server Error"
        });
    }
}

module.exports = closePost
