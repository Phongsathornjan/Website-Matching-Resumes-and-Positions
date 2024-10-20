const Post = require("../../../model/post");
const Resume = require("../../../model/resume");

const TfIdf = require("../../../class/Tfidf");

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

    // tfIDF สำหรับแต่ละส่วน
    const tfidfSkill = new TfIdf();
    const tfidfExperiences = new TfIdf();
    const tfidfDegree = new TfIdf();

    // เพิ่มข้อมูลสำหรับการคำนวณ similarity
    postSkill.forEach((Skill) => tfidfSkill.addDocument(Skill));
    postExperience.forEach((experience) =>
      tfidfExperiences.addDocument(experience)
    );
    postDegree.forEach((degree) => tfidfDegree.addDocument(degree));

    const results = [];

    // คำนวณ similarity สำหรับ Skill, Experience และ Degree
    tfidfSkill.computeSimilarities(userSkill, (i, SkillSimilarity) => {
      tfidfExperiences.computeSimilarities(
        userExperience,
        (j, experienceSimilarity) => {
          tfidfDegree.computeSimilarities(userDegree, (k, degreeSimilarity) => {
            if (i === j && i === k) {
              // ตรวจสอบให้แน่ใจว่าตรงกันทั้งสามค่า
              // คำนวณ Weighted Similarity โดย Skill 40%, Experience 40%, และ Degree 20%
              const weightedSimilarity =
                SkillSimilarity * 0.4 +
                experienceSimilarity * 0.4 +
                degreeSimilarity * 0.2;

              // เก็บผลลัพธ์
              results.push({
                postSkillIndex: i,
                similarity: weightedSimilarity,
              });
            }
          });
        }
      );
    });

    results.sort((a, b) => b.similarity - a.similarity);

    // results.forEach(result => {
    //     console.log(`postSkill ${result.postSkillIndex} มีความคล้ายคลึง: ${result.similarity.toFixed(2)}%`);
    // });

    // console.log("UserSkill : "+userSkill);
    // console.log("PostSkill : "+postSkill[52]);

    // กรองผลลัพธ์ที่มีเปอร์เซ็นต์มากกว่า 50%
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
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getMostMatchPost;
