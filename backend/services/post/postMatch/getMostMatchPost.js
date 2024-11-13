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
    postExperience.forEach((experience) => {
      if (experience == "-") {
        cosineExperiences.addDocument("PostNoNeedExperience");
      } else {
        cosineExperiences.addDocument(experience);
      }
    });
    postDegree.forEach((degree) => cosineDegree.addDocument(degree));

    function filterUserSkillByPostSkill(postSkillArray, userSkill) {
      // แปลง userSkill ให้เป็นอาร์เรย์ถ้ามีค่าเดียว
      const skillsArray = userSkill.split(",").map((skill) => skill.trim().toLowerCase());

      // กรองเฉพาะคำที่มีบางส่วนตรงกันใน postSkillArray
      return skillsArray.filter(
        (skill) =>
          postSkillArray.some(
            (postSkillItem) =>
              postSkillItem.toLowerCase().includes(skill) || skill.includes(postSkillItem.toLowerCase())
          )
      );
    }

    async function computeSkillSimilarity() {
      const skillResults = await Promise.all(
        postSkill.map((_, index) => {
          // แยก postSkill[index] ที่เป็นสตริงออกเป็นอาร์เรย์ของคำทักษะ
          const postSkillArray = postSkill[index].split(",").map((skill) => skill.trim().toLowerCase());
           // กรองทักษะจาก userSkill ที่ตรงกับ postSkill
          const filteredUserSkill = filterUserSkillByPostSkill(postSkillArray, userSkill);
          // console.log("userSkill => " + userSkill);
          // console.log("filteredUserSkill => " + filteredUserSkill);
          // console.log("postSkill => " + postSkillArray);
          // console.log('---------------------------------------');
          return new Promise((resolve) => {
            cosineSkill.computeSimilarities(filteredUserSkill.join(", "), (i, SkillSimilarity) => {
              if (i === index) {
                resolve(SkillSimilarity);
              }
            });
          });
        })
      );
      return skillResults;
    }

    async function computeExperienceSimilarity() {
      const experienceResults = await Promise.all(
        postExperience.map((_, index) => {
          return new Promise((resolve) => {
            cosineExperiences.computeSimilarities(userExperience, (i, experienceSimilarity) => {
              if (i === index) {
                resolve(experienceSimilarity);
              }
            });
          });
        })
      );
      return experienceResults;
    }

    async function computeDegreeSimilarity() {
      const degreeResults = await Promise.all(
        postDegree.map((_, index) => {
          return new Promise((resolve) => {
            cosineDegree.computeSimilarities(userDegree, (i, degreeSimilarity) => {
              if (i === index) {
                resolve(degreeSimilarity);
              }
            });
          });
        })
      );
      return degreeResults;
    }

    // คำนวณ Skill, Experience และ Degree สำหรับแต่ละโพสต์
    const [skillResults, experienceResults, degreeResults] = await Promise.all([
      computeSkillSimilarity(),
      computeExperienceSimilarity(),
      computeDegreeSimilarity(),
    ]);

    // คำนวณ Weighted Similarity โดย Skill 40%, Experience 40%, และ Degree 20%
    const results = posts.map((_, index) => {
      const weightedSimilarity =
        skillResults[index] * 0.4 + experienceResults[index] * 0.4 + degreeResults[index] * 0.2;

      return {
        postSkillIndex: index,
        similarity: weightedSimilarity,
      };
    });

    // จัดเรียงผลลัพธ์
    results.sort((a, b) => b.similarity - a.similarity);

    // กรองผลลัพธ์ที่มีเปอร์เซ็นต์มากกว่า 10%
    const filteredResults = results
      .filter((result) => result.similarity > 60)
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
