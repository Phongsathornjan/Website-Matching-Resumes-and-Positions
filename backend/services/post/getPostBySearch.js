const Post = require('../../model/post');

const getPostBySearch = async (req, res) => {
    try {
        const textSearch = req.params.textSearch;
        const location = req.params.location;
        const jobField = req.params.jobField;

        if (!(textSearch && location && jobField)) {
            return res.status(400).json({
                message: 'Not found params'
            });
        }

        const searchConditions = {
            $text: { $search: textSearch },
            Location: location, 
            WorkField: jobField 
        };

        const result = await Post.find(searchConditions).sort({ score: { $meta: "textScore" } });
        return res.json(result);
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

module.exports = getPostBySearch;
