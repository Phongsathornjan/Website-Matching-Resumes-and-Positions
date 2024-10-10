const mongoose = require("mongoose");
const Post = require("../../model/post");

const getHrAppointment = async (req, res) => {
  try {
    const { userId, DateTime } = req.params;

    if (!userId || !DateTime) {
      return res.status(400).json({
        message: "not found params",
      });
    }

    const posts = await Post.find({
      userId: new mongoose.Types.ObjectId(userId), 
      applicants: {
        $elemMatch: {
          DateTime: { $eq: new Date(DateTime) },
        },
      },
    });

    if (posts.length === 0) {
      return res.status(404).json({
        message: "No appointments found",
      });
    }

    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = getHrAppointment;
