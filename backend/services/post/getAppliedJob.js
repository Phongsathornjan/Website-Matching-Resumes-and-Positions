const Post = require('../../model/post')

const getAppliedJob = async (req,res) => {
    const {userId} = req.params
    if(!userId){
        return res.status(400).json({
            message: 'ID User not found'
        })
    }

    try{
     
      const result = await Post.aggregate([
        {
          $match: { "applicants.userId": userId } 
        },
        {
          $lookup: {
            from: "users",                          
            localField: "userId",                   
            foreignField: "_id",                    
            as: "CompanyData"                      
          }
        },
        {
          $addFields: {
            hasInterview: {  
              $cond: {
                if: { $gt: [{ $size: { $filter: { input: "$applicants", cond: { $eq: ["$$this.status", "interview"] } } } }, 0] },
                then: 1,
                else: 0
              }
            }
          }
        },
        {
          $sort: { 
            hasInterview: -1,            
            "applicants.time_stamp": -1  
          }
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            Position: 1,
            Location: 1,
            JobDescription: 1,
            "applicants.status": 1,
            "applicants.time_stamp": 1,
            "CompanyData.companyName": 1,         
            "CompanyData.companyLocation": 1,
            "CompanyData.companyDetail": 1
          }
        }
      ]);     

        if(result.length != 0){
            return res.status(200).json(result)
        }else{
            return res.status(204).json({
                message: "No Content"
            });  
        }
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message: "Internal Server Error"
        });      
    }
}

module.exports = getAppliedJob