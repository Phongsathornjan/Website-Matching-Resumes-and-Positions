const Post = require("../../../model/post");
const Resume = require("../../../model/resume");

const natural = require("natural");

const getMostMatchPost = async (req, res) => {
  const { userId, Location, WorkField } = req.params;

  try {
    if (!Location && !WorkField && !userId) {
      return res.status(404).json({ message: "Not Found params" });
    }

    const posts = await Post.find(
      { Location: Location, WorkField: WorkField },
      { applicants: 0, WorkField: 0 }
  ).populate('userId', 'companyDetail CompanyName');
  
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

    const postKeyword = posts.map(
      (post) => `${post.keyword}` + ` ${post.KeyExperience}`
    );
    const userKeyword =  `${userData[0].keyword}`+` ${userData[0].Experience}`;

    //tfIDF
    const tfidf = new natural.TfIdf();
    postKeyword.forEach((i) => tfidf.addDocument(i));

    const results = [];
    tfidf.tfidfs(userKeyword, (i, measure) => {
      results.push({ postKeywordIndex: i, similarity: measure+37});
    });

    results.sort((a, b) => b.similarity - a.similarity);
    
    // results.forEach(result => {
    //     console.log(`postKeyword ${result.postKeywordIndex} มีความคล้ายคลึง: ${result.similarity.toFixed(2)}%`);
    // });

    // console.log("UserKeyword : "+userKeyword);
    // console.log("PostKeyword : "+postKeyword[53]);


    // กรองผลลัพธ์ที่มีเปอร์เซ็นต์มากกว่า 50%
    const filteredResults = results
      .filter(result => result.similarity > 70)
      .map(result => ({
        ...posts[result.postKeywordIndex]._doc,
        matchPercentage: (result.similarity).toFixed(2) // เพิ่มฟิลด์เปอร์เซ็นต์ match
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
