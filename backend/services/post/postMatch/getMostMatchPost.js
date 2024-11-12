const Post = require("../../../model/post");
const Resume = require("../../../model/resume");

const cosine = require("../../../class/cosine");

const getMostMatchPost = async (req, res) => {
  const { userId, Location, WorkField } = req.params;

  try {
    if (!Location && !WorkField && !userId) {
      return res.status(404).json({ message: "Not Found params" });
    }

    const posts = await Post.find(
      { Location: Location, WorkField: WorkField, status: "open" },
      { applicants: 0, WorkField: 0 }
    ).populate("userId", "companyDetail companyName");

    if (posts.length == 0) {
      return res.status(204).json({
        message: "Not found post",
      });
    }

    const userData = await Resume.find({ userId: userId });
    if (!userData) {
      return res.status(204).json({
        message: "Not found user",
      });
    }

    const postSkill = posts.map((data) => data.Skill);
    const postExperience = posts.map((data) => data.keyExperience);
    const postDegree = posts.map((data) => data.Degree);
    
    const userSkill = userData[0].Skill;
    const userExperience = userData[0].Experience;
    const userDegree = userData[0].Degree;
    
    // cosine สำหรับแต่ละส่วน
    const cosineSkill = new cosine();
    const cosineExperiences = new cosine();
    const cosineDegree = new cosine();
    
    // เพิ่มข้อมูลสำหรับการคำนวณ similarity
    postSkill.forEach((Skill) => cosineSkill.addDocument(Skill));
    postExperience.forEach((experience) => cosineExperiences.addDocument(experience));
    postDegree.forEach((degree) => cosineDegree.addDocument(degree));
    
    // ฟังก์ชันสำหรับคำนวณ similarity แต่ละส่วน
    function computeSkillSimilarity(index) {
      return new Promise((resolve) => {
        cosineSkill.computeSimilarities(userSkill, (i, SkillSimilarity) => {
          if (i === index) {
            resolve(SkillSimilarity);
          }
        });
      });
    }
    
    function computeExperienceSimilarity(index) {
      return new Promise((resolve) => {
        cosineExperiences.computeSimilarities(userExperience, (j, experienceSimilarity) => {
          if (j === index) {
            resolve(experienceSimilarity);
          }
        });
      });
    }
    
    function computeDegreeSimilarity(index) {
      return new Promise((resolve) => {
        cosineDegree.computeSimilarities(userDegree, (k, degreeSimilarity) => {
          if (k === index) {
            resolve(degreeSimilarity);
          }
        });
      });
    }
    
    // คำนวณ Skill, Experience และ Degree สำหรับแต่ละโพสต์
    const results = [];
    
    const similarityPromises = posts.map((_, index) => {
      return Promise.all([
        computeSkillSimilarity(index),
        computeExperienceSimilarity(index),
        computeDegreeSimilarity(index),
      ]).then(([SkillSimilarity, experienceSimilarity, degreeSimilarity]) => {
        // คำนวณ Weighted Similarity โดย Skill 40%, Experience 40%, และ Degree 20%
        const weightedSimilarity =
          SkillSimilarity * 0.4 + experienceSimilarity * 0.4 + degreeSimilarity * 0.2;
    
        // เก็บผลลัพธ์สำหรับแต่ละโพสต์
        results.push({
          postSkillIndex: index,
          similarity: weightedSimilarity,
        });
      });
    });
    
    // รอให้การคำนวณทั้งหมดเสร็จสิ้นก่อนประมวลผลต่อ
    Promise.all(similarityPromises)
      .then(() => {
        // จัดเรียงผลลัพธ์
        results.sort((a, b) => b.similarity - a.similarity);
    
        // กรองผลลัพธ์ที่มีเปอร์เซ็นต์มากกว่า 10%
        const filteredResults = results
          .filter((result) => result.similarity > 10)
          .map((result) => ({
            ...posts[result.postSkillIndex]._doc,
            matchPercentage: result.similarity.toFixed(2),
          }));
    
        if (filteredResults.length === 0) {
          return res.status(204).json({
            message: "No matching posts found",
          });
        }
    
        return res.status(200).json(filteredResults);
      })
    
      .catch((err) => {
        console.error("Error computing similarities:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getMostMatchPost;
