const Post = require('../../model/post');

const getPost = async (req, res) => {
    const { userId } = req.params;

    try {
      const posts = await Post.find({ userId }).sort({ time_stamp: -1 });
      if (posts.length === 0) {
        return res.status(404).json({ message: 'No posts found for this userId' });
      }
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = getPost