const Post = require('../../model/post');

const createPost = async (req, res) => {
    
    try{
        const {userId, Position, Salary, WorkField, Location, Requirements, Qualifications, Experience} = req.body;

        if(!(userId && Position && Salary && WorkField && Location && Requirements && Qualifications && Experience)){
            return res.status(400).json({
                message: 'All input is require'
            })
        }

        const post = await Post.create({
            userId: userId,
            Position: Position,
            Salary: Salary,
            WorkField: WorkField,
            Location: Location,
            Requirements: Requirements,
            Qualifications: Qualifications,
            Experience: Experience,
            time_stamp: Date.now(),
        })
        return res.status(200).json({
            post,
            message: 'upload post Success'
        })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message: 'Internal Server Error'
        })
    }

}

module.exports = createPost;