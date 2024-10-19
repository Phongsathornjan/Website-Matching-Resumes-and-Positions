const Resume = require('../../model/resume');
const User = require('../../model/user');
const Post = require('../../model/post');

const getUserInPostBySearch = async (req, res) => {
    try {
        const { IdPost, textSearch } = req.params;

        if (!textSearch || !IdPost) {
            return res.status(404).json({ message: 'Not Found params' });
        }

        // ค้นหา Post และผู้สมัคร
        const post = await Post.findById(IdPost).select('applicants');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const userIds = post.applicants.map(applicant => applicant.userId);

        // ค้นหาใน User ด้วย textSearch
        const users = await User.find({
            _id: { $in: userIds },
            $text: { $search: textSearch }
        }).select('_id first_name last_name');

        // ค้นหาใน Resume ด้วย textSearch
        const resumes = await Resume.find({
            userId: { $in: userIds },
            $text: { $search: textSearch }
        }).populate('userId', 'first_name last_name');

        // รวมผลลัพธ์จากทั้ง User และ Resume
        const combinedResumes = [
            ...resumes,
            ...await Resume.find({
                userId: { $in: users.map(user => user._id) }
            }).populate('userId', 'first_name last_name email')
        ];

        return res.status(200).json(combinedResumes);

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

module.exports = getUserInPostBySearch;
