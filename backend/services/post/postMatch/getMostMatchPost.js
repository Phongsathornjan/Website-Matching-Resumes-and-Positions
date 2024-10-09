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
      { Location: Location, WorkField: WorkField },
      { applicants: 0, WorkField: 0 }
  ).populate('userId', 'companyDetail companyName');
  
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

    const postKeyword = posts.map((data) => data.keyword);
    const postExperience = posts.map((data) => data.Experience);

    const userKeyword = userData[0].keyword;
    const userExperience = userData[0].Experience;


    //tfIDF
    const tfidfKeywords = new TfIdf();
    const tfidfExperiences = new TfIdf();
    postKeyword.forEach((keyword) => tfidfKeywords.addDocument(keyword));
    postExperience.forEach((experience) => tfidfExperiences.addDocument(experience));

    const results = [];
    tfidfKeywords.computeSimilarities(userKeyword, (i, keywordSimilarity) => {
      tfidfExperiences.computeSimilarities(userExperience, (j, experienceSimilarity) => {
          if (i === j) {
              // ตรวจสอบว่า experienceSimilarity เป็น 0 หรือไม่
              const weightedSimilarity = (experienceSimilarity === 0)
                  ? keywordSimilarity * 1 // ให้น้ำหนักที่ keyword 100%
                  : (keywordSimilarity * 0.5) + (experienceSimilarity * 0.5); // ให้น้ำหนัก 50%
  
              results.push({ postKeywordIndex: i, similarity: weightedSimilarity });
          }
      });
  });
  
    results.sort((a, b) => b.similarity - a.similarity);
    
    // results.forEach(result => {
    //     console.log(`postKeyword ${result.postKeywordIndex} มีความคล้ายคลึง: ${result.similarity.toFixed(2)}%`);
    // });

    // console.log("UserKeyword : "+userKeyword);
    // console.log("PostKeyword : "+postKeyword[52]);


    // กรองผลลัพธ์ที่มีเปอร์เซ็นต์มากกว่า 50%
    const filteredResults = results
      .filter(result => result.similarity > 10)
      .map(result => ({
        ...posts[result.postKeywordIndex]._doc,
        matchPercentage: (result.similarity).toFixed(2)
      }));

    if (filteredResults.length === 0) {
      return res.status(204).json({
        message: "No matching posts found",
      });
    }

    return res.status(200).json(filteredResults)
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getMostMatchPost;
