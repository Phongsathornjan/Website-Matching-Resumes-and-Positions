const Post = require('../../model/post');

const createPost = async (req, res) => {
    
    try{
        const {userId,topic,company,position,salary,location,description} = req.body;

        if(!(userId && topic && company && position && salary && location && description)){
            return res.status(400).json({
                message: 'All input is require'
            })
        }

        const post = await Post.create({
            userId: userId,
            topic: topic,
            company: company,
            position: position,
            salary: salary,
            location: location,
            description: description,
            time_stamp: Date.now(),
        })
        return res.status(200).json({
            post,
            message: 'upload post Success'
        })
    }catch(err){
        console.log(err);
    }

}

module.exports = createPost;