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

      const userKeywords = userData.map((data) => data.keyword);
      const userExperiences = userData.map((data) => data.Experience);
    
      const postKeyword = posts[0].keyword;
      const postExperience = posts[0].KeyExperience;
    
      const tfidfKeywords = new TfIdf();
      const tfidfExperiences = new TfIdf();

      userKeywords.forEach((keyword) => tfidfKeywords.addDocument(keyword));
      userExperiences.forEach((experience) => tfidfExperiences.addDocument(experience));
    
      const results = [];

    // คำนวณ Cosine Similarity สำหรับ Keyword และ Experience แยกกัน
    tfidfKeywords.computeSimilarities(postKeyword, (i, keywordSimilarity) => {
      tfidfExperiences.computeSimilarities(postExperience, (j, experienceSimilarity) => {
          if (i === j) {
              // ตรวจสอบว่า experienceSimilarity เป็น 0 หรือไม่
              const weightedSimilarity = (experienceSimilarity === 0)
                  ? keywordSimilarity * 1 // ให้น้ำหนักที่ keyword 100%
                  : (keywordSimilarity * 0.5) + (experienceSimilarity * 0.5); // ให้น้ำหนัก 50%
  
              results.push({ userKeywordIndex: i, similarity: weightedSimilarity });
          }
      });
  });
  
    results.sort((a, b) => b.similarity - a.similarity);
    
        // results.forEach(result => {
        //     console.log(`userKeyword ${result.userKeywordIndex} มีความคล้ายคลึง: ${result.similarity.toFixed(2)}%`);
        // });
    
        // console.log("UserKeyword : "+userKeyword[18]);
        // console.log("PostKeyword : "+postKeyword);
    
        const finalResults = results.map(result => ({
          ...userData[result.userKeywordIndex]._doc,
          matchPercentage: result.similarity.toFixed(2)
        }));
    
      return res.status(200).json(finalResults);
  } catch (err) {
    return res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = getMostMatchFromOutPost;
