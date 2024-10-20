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
    
    // เพิ่มข้อมูลลงใน tf-idf
    userSkill.forEach((Skill) => tfidfSkill.addDocument(Skill));
    userExperiences.forEach((experience) => tfidfExperiences.addDocument(experience));
    userDegree.forEach((degree) => tfidfDegree.addDocument(degree));
    
    const results = [];
    
    // แยกการคำนวณ similarity ออกเป็น 3 ฟังก์ชัน
    async function calculateSkillSimilarity() {
        return new Promise((resolve) => {
            const skillResults = [];
            tfidfSkill.computeSimilarities(postSkill, (i, skillSimilarity) => {
                skillResults.push({ userSkillIndex: i, skillSimilarity });
                resolve(skillResults);
            });
        });
    }
    
    async function calculateExperienceSimilarity() {
        return new Promise((resolve) => {
            const experienceResults = [];
            tfidfExperiences.computeSimilarities(postExperience, (i, experienceSimilarity) => {
                experienceResults.push({ userExperienceIndex: i, experienceSimilarity });
                resolve(experienceResults);
            });
        });
    }
    
    async function calculateDegreeSimilarity() {
        return new Promise((resolve) => {
            const degreeResults = [];
            tfidfDegree.computeSimilarities(postDegree, (i, degreeSimilarity) => {
                degreeResults.push({ userDegreeIndex: i, degreeSimilarity });
                resolve(degreeResults);
            });
        });
    }
    
    async function calculateSimilarity() {
        try {
            // ทำการคำนวณทั้ง 3 ส่วนพร้อมกัน
            const [skillResults, experienceResults, degreeResults] = await Promise.all([
                calculateSkillSimilarity(),
                calculateExperienceSimilarity(),
                calculateDegreeSimilarity(),
            ]);
    
            // รวมผลลัพธ์จากทั้ง 3 ส่วนเข้าด้วยกัน
            skillResults.forEach((skillResult, index) => {
                const experienceResult = experienceResults.find((result) => result.userExperienceIndex === skillResult.userSkillIndex);
                const degreeResult = degreeResults.find((result) => result.userDegreeIndex === skillResult.userSkillIndex);
    
                // ตรวจสอบให้แน่ใจว่ามีค่าที่ตรงกันจากทั้ง 3 ส่วน
                if (experienceResult && degreeResult) {
                    const weightedSimilarity = 
                        skillResult.skillSimilarity * 0.4 + 
                        experienceResult.experienceSimilarity * 0.4 + 
                        degreeResult.degreeSimilarity * 0.2;
    
                    results.push({
                        userSkillIndex: skillResult.userSkillIndex,
                        similarity: weightedSimilarity,
                    });
                }
            });
    
            // เรียงลำดับผลลัพธ์ตาม similarity
            results.sort((a, b) => b.similarity - a.similarity);
    
            // ส่งผลลัพธ์สุดท้ายกลับ
            const output = results.map(result => ({
                ...userData[result.userSkillIndex]._doc,
                matchPercentage: result.similarity.toFixed(2),
            }));
    
            return output;
        } catch (error) {
            console.error('Error calculating similarities:', error);
        }
    }
    
    // เรียกฟังก์ชันและส่ง response กลับ
    calculateSimilarity().then((finalResults) => {
        return res.status(200).json(finalResults);
    }).catch((error) => {
        return res.status(500).json({ error: 'Error calculating similarities' });
    });
    
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = getMostMatchUser;
