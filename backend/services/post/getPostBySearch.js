const Post = require('../../model/post');
const User = require('../../model/user'); 
const getPostBySearch = async (req, res) => {
    try {
        const textSearch = req.params.textSearch !== 'null' ? req.params.textSearch : null;
        const location = req.params.location !== 'null' ? req.params.location : null;
        const jobField = req.params.jobField !== 'null' ? req.params.jobField : null;

        if (!textSearch && !location && !jobField) {
            return res.status(404).json({ message: 'Not Found' });
        }

        let searchConditions = { status: 'open' };

        if (textSearch) {
            searchConditions.$text = { $search: textSearch };
        }

        if (location) {
            searchConditions.Location = location;
        }

        if (jobField) {
            searchConditions.WorkField = jobField;
        }

        let sortCondition = {};
        if (textSearch) {
            sortCondition = { score: { $meta: "textScore" } };
        } else {
            sortCondition = { time_stamp: -1 }; 
        }

        const result = await Post.aggregate([
            { $match: searchConditions }, 
            {
                $lookup: {
                    from: 'users', 
                    localField: 'userId', 
                    foreignField: '_id', 
                    as: 'userDetails' 
                }
            },
            { $unwind: '$userDetails' }, 
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    Position: 1,
                    Salary: 1,
                    Location: 1,
                    WorkField: 1,
                    JobDescription: 1,
                    Qualifications: 1,
                    Experience: 1,
                    time_stamp: 1,
                    companyName: '$userDetails.companyName',  
                    companyDetail: '$userDetails.companyDetail', 
                }
            },
            { $sort: sortCondition } 
        ]);

        return res.json(result);

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

module.exports = getPostBySearch;
