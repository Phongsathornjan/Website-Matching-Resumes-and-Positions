const Post = require('../../model/post');
const mongoose = require('mongoose');

const applyJobPost = async (req, res) => {
    try {
        const { idPost, idUser } = req.params;

        if (!idPost || !idUser) {
            return res.status(400).json({
                message: 'ID post or user not found'
            });
        }

        const post = await Post.findById(idPost);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const findApplicant = post.applicants.find(applicant => applicant.userId === idUser);
        if (findApplicant) {
            return res.status(400).json({ message: 'This user already applied for this job' });
        }
        
        post.applicants.push({
            applicantsID: new mongoose.Types.ObjectId(),
            userId: idUser,
            time_stamp: Date.now(),
            status: 'pending'
        });

        
        const updatedPost = await post.save();

        return res.status(200).json({
            message: 'Application added successfully',
            updatedPost
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

module.exports = applyJobPost;
