const Post = require("../../../model/post");
const Resume = require("../../../model/resume");
const mongoose = require("mongoose");

const TfIdf = require("../../../class/Tfidf");

const getMostMatchUser = async (req, res) => {
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
          Skill: 1,
          keyExperience: 1,
          Degree: 1,
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
          Skill: 1,
          keyExperience: 1,
          Degree: 1,
          applicants: {
            $map: {
              input: "$applicants",
              as: "applicant",
              in: { userId: "$$applicant.userId" },
            },
          },
        },
      },
    ]);

    const userIds =
      posts[0]?.applicants.map((applicant) => applicant.userId) || [];
    let userData = [];

    if (userIds.length > 0) {
      userData = await Resume.find(
        {
          userId: { $in: userIds },
        },
        { _id: 0 }
      ).populate(
        "userId",
        "-companyDetail -companyName -password -role -appliedJobs -postedJobs -jobField"
      );
    }

    const userSkill = userData.map((data) => data.Skill);
    const userExperiences = userData.map((data) => data.Experience);
    const userDegree = userData.map((data) => data.Degree);

    const postSkill = posts[0].Skill;
    const postExperience = posts[0].keyExperience;
    const postDegree = posts[0].Degree;

    const tfidfSkill = new TfIdf();
    const tfidfExperiences = new TfIdf();
    const tfidfDegree = new TfIdf();

    userSkill.forEach((Skill) => tfidfSkill.addDocument(Skill));
    userExperiences.forEach((experience) =>
      tfidfExperiences.addDocument(experience)
    );
    userDegree.forEach((degree) => tfidfDegree.addDocument(degree));

    const results = [];

    // คำนวณ Cosine Similarity สำหรับ Keyword และ Experience แยกกัน
    tfidfSkill.computeSimilarities(postSkill, (i, skillSimilarity) => {
      tfidfExperiences.computeSimilarities(
        postExperience,
        (j, experienceSimilarity) => {
          tfidfDegree.computeSimilarities(postDegree, (k, degreeSimilarity) => {
            if (i === j && i === k) {
              // คำนวณ Weighted Similarity โดยให้น้ำหนัก 50% สำหรับ Skill, 40% สำหรับ Experience, และ 10% สำหรับ Degree
              const weightedSimilarity =
                skillSimilarity * 0.4 +
                experienceSimilarity * 0.4 +
                degreeSimilarity * 0.2;

              results.push({
                userSkillIndex: i,
                similarity: weightedSimilarity,
              });
            }
          });
        }
      );
    });

    results.sort((a, b) => b.similarity - a.similarity);

    // results.forEach(result => {
    //     console.log(`userKeyword ${result.userSkillIndex} มีความคล้ายคลึง: ${result.similarity.toFixed(2)}%`);
    // });

    // console.log("UserKeyword : "+userKeyword[18]);
    // console.log("PostKeyword : "+postKeyword);

    const finalResults = results.map((result) => ({
      ...userData[result.userSkillIndex]._doc,
      matchPercentage: result.similarity.toFixed(2),
    }));

    return res.status(200).json(finalResults);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = getMostMatchUser;
