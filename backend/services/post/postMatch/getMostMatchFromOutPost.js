const Post = require("../../../model/post");
const Resume = require("../../../model/resume");
const mongoose = require("mongoose");

const TfIdf = require("../../../class/Tfidf");

const getMostMatchFromOutPost = async (req, res) => {
  const { IdPost } = req.params;
  if (!IdPost) {
    return res.status(404).json({ message: "Not Found params" });
  }
  try {
    const posts = await Post.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(IdPost),
        },
      },
      {
        $project: {
          keyword: 1,
          KeyExperience: 1,
          WorkField: 1,
          Location: 1,
          applicants: {
            $filter: {
              input: "$applicants",
              as: "applicant",
              cond: { $eq: ["$$applicant.status", "pending"] },
            },
          },
        },
      },
      {
        $project: {
          keyword: 1,
          KeyExperience: 1,
          WorkField: 1,
          Location: 1,
          applicantUserIds: {
            $map: {
              input: "$applicants",
              as: "applicant",
              in: "$$applicant.userId",
            },
          },
        },
      },
    ]);

    // หารายชื่อ userId ที่ไม่อยู่ใน applicant.userId
    const applicantUserIds = posts[0]?.applicantUserIds || [];

    const userData = await Resume.find({
      userId: { $nin: applicantUserIds }, // userId ที่ไม่อยู่ใน applicantUserIds
    })
      .populate({
        path: "userId",
        select: "-companyDetail -companyName -password -role -appliedJobs -postedJobs -jobField",
        match: {
          location: posts[0].Location,
          jobField: posts[0].WorkField, 
        },
      });

    userKeyword = userData.map(
      (data) => `${data.keyword} + ${data.Experience}`
    );

    postKeyword = `${posts[0].keyword}` + ` ${posts[0].KeyExperience}`;

    const tfidf = new TfIdf();
    userKeyword.forEach((i) => {
      tfidf.addDocument(i);
    });

    const results = [];
    tfidf.tfidfs(postKeyword, (i, measure) => {
      results.push({ userKeywordIndex: i, similarity: measure });
    });
    results.sort((a, b) => b.similarity - a.similarity);

    // results.forEach(result => {
    //     console.log(`userKeyword ${result.userKeywordIndex} มีความคล้ายคลึง: ${result.similarity.toFixed(2)}%`);
    // });

    // console.log("UserKeyword : "+userKeyword[18]);
    // console.log("PostKeyword : "+postKeyword);

    const finalResults = results.map((results) => ({
      ...userData[results.userKeywordIndex]._doc,
      matchPercentage: results.similarity.toFixed(2),
    }));

    return res.status(200).json(finalResults);
  } catch (err) {
    return res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = getMostMatchFromOutPost;
