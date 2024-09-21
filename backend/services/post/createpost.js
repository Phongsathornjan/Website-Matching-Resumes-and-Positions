const ExtractDataJobPost = require('../../ExtractDataJobPost');
const Post = require('../../model/post');

const createPost = async (req, res) => {
    
    try{
        const {userId, Position, Salary, WorkField, Location, Requirements, Qualifications, Experience} = req.body;

        if(!(userId && Position && Salary && WorkField && Location && Requirements && Qualifications && Experience)){
            return res.status(400).json({
                message: 'กรุณากรอกข้อมูลให้ครบ'
            })
        }

        const Job_Description = {
            Position: `${Position}`,
            Requirements: `${Requirements}`,
            Qualifications: `${Qualifications}`,
            Experience: `${Experience}`
        }

        const ExtractedData = await ExtractDataJobPost(Job_Description)
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
            keyword: ExtractedData.Output[0].keyword,
            Experience: ExtractedData.Output[0].Experience
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