const Post = require('../../model/post');

const getPostBySearch = async (req, res) => {
    try {
        const textSearch = req.params.textSearch !== 'null' ? req.params.textSearch : null;
        const location = req.params.location !== 'null' ? req.params.location : null;
        const jobField = req.params.jobField !== 'null' ? req.params.jobField : null;

        if (!textSearch && !location && !jobField) {
            return res.status(404).json({ message: 'Not Found' });
        }

        let searchConditions = {};

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
            sortCondition = { time_stamp: -1 };  // เรียงตามเวลาถ้าไม่มี textSearch
        }

        const result = await Post.find(searchConditions).sort(sortCondition);
        return res.json(result);

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

module.exports = getPostBySearch;
