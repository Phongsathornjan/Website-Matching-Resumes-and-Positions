const Post = require('../../model/post');
const mongoose = require('mongoose');

const deletePost = async (req, res) => {

    const {idPost} = req.params;
    if(!idPost){
        return res.status(400).json({
            message: 'ID post not found'
        })
    }

    try{
        const result = await Post.deleteOne({_id: new mongoose.Types.ObjectId(idPost)});
        return res.status(200).json({
            message: "Success",
            result
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message: "Error deleting Post"
        });
    }

}

module.exports = deletePost;
