const Post = require("../../../model/post");
const Resume = require("../../../model/resume");
const mongoose = require("mongoose");
const User = require('../../../model/user');

const cosine = require("../../../class/cosine");

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
          Skill: 1,
          keyExperience: 1,
          Degree: 1,
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
          Skill: 1,
          keyExperience: 1,
          Degree: 1,
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

    const userDataId = await User.find({
      _id: { $nin: applicantUserIds }, // userId ที่ไม่อยู่ใน applicantUserIds
      location: posts[0].Location,    // location ตรงกับ posts[0].Location
      jobField: posts[0].WorkField,   // jobField ตรงกับ posts[0].WorkField
    }).select("_id"); // เลือกเฉพาะ _id
    
    const userIds = userDataId.map((user) => user._id); 

    const userData = await Resume.find({
      userId: { $in: userIds }, // หา Resume ที่ userId อยู่ใน userIds
    }).populate({
      path: "userId",
      select:
        "-companyDetail -companyName -password -role -appliedJobs -postedJobs -jobField"
    });

    if(userData[0].userId === null){
      return res.status(200).json([])
    }

    const userSkill = userData.map((data) => data.Skill);
    const userExperiences = userData.map((data) => data.Experience);
    const userDegree = userData.map((data) => data.Degree);
    
    const postSkill = posts[0].Skill;
    const postExperience = posts[0].keyExperience;
    const postDegree = posts[0].Degree;
    
    const cosineSkill = new cosine();
    const cosineExperiences = new cosine();
    const cosineDegree = new cosine();
    
    // เพิ่มข้อมูลลงใน tf-idf
    userExperiences.forEach((experience) => cosineExperiences.addDocument(experience));
    userDegree.forEach((degree) => cosineDegree.addDocument(degree));
    
    const results = [];

    function filterUserSkillByPostSkill(userSkillArray, postSkill) {
      // แปลง postSkill ให้เป็นอาร์เรย์ของคำโดยการแยกตามเครื่องหมาย comma และแปลงเป็นตัวพิมพ์เล็ก
      const skillsArray = postSkill.split(',').map(skill => skill.trim().toLowerCase());
  
      // กรองคำใน userSkillArray ที่ตรงกับคำใน skillsArray เท่านั้น
      return userSkillArray.filter((skill) =>
          skillsArray.some((postSkillItem) => {
              const trimmedPostSkillItem = postSkillItem.trim().toLowerCase();
              const trimmedSkill = skill.trim().toLowerCase();
  
              // ตรวจสอบว่ามีคำใน postSkill ที่ตรงกับคำใน userSkill หรือไม่
              return trimmedPostSkillItem === trimmedSkill;
          })
      );
  }
  
  
  
  async function calculateSkillSimilarity() {
      return new Promise((resolve) => {
          const skillResults = [];
  
          // กรองคำใน userSkill ที่ตรงกับ postSkill
              const filteredUserSkills = userSkill.map(skill => {
              const userSkillArray = skill.split(',').map(skillItem => skillItem.trim().toLowerCase());
              // console.log("postSkill => "+postSkill)
              // console.log("userSkill => "+userSkillArray)
              // console.log("filteredUserSkill => "+filterUserSkillByPostSkill(userSkillArray, postSkill).join(', '))
              // console.log('---------------------------------------');
              return filterUserSkillByPostSkill(userSkillArray, postSkill);
          });

          filteredUserSkills.forEach((Skill) => {
            // แปลงแต่ละ array ให้เป็น string ที่คั่นด้วย comma
            const skillString = Skill.join(', ');  // ใช้ `, ` เพื่อคั่นคำแต่ละคำด้วย comma และช่องว่าง
            cosineSkill.addDocument(skillString);
        });

          // คำนวณ similarity สำหรับ allFilteredSkills
          cosineSkill.computeSimilarities(postSkill.toLowerCase(), (i, skillSimilarity) => {
              skillResults.push({ userSkillIndex: i, skillSimilarity });
              // console.log(skillSimilarity)
          });
  
          resolve(skillResults); // ส่งผลลัพธ์หลังคำนวณเสร็จ
      });
  }
    
    async function calculateExperienceSimilarity() {
        return new Promise((resolve) => {
            const experienceResults = [];
            cosineExperiences.computeSimilarities(postExperience, (i, experienceSimilarity) => {
                experienceResults.push({ userExperienceIndex: i, experienceSimilarity });
                resolve(experienceResults);
            });
        });
    }
    
    async function calculateDegreeSimilarity() {
        return new Promise((resolve) => {
            const degreeResults = [];
            cosineDegree.computeSimilarities(postDegree, (i, degreeSimilarity) => {
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
    return res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = getMostMatchFromOutPost;
