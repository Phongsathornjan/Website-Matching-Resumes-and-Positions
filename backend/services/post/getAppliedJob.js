const Post = require('../../model/post');

const getAppliedJob = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({
      message: 'ID User not found',
    });
  }

  try {
    const result = await Post.aggregate([
      {
        $match: { "applicants.userId": userId },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "CompanyData",
        },
      },
      {
        $addFields: {
          applicants: {
            $filter: {
              input: "$applicants", // กรองเฉพาะ applicant ที่ userId ตรงกับที่ส่งมา
              as: "applicant",
              cond: { $eq: ["$$applicant.userId", userId] },
            },
          },
          hasInterview: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: "$applicants",
                        as: "applicant",
                        cond: { $eq: ["$$applicant.status", "SelectAppointment"] },
                      },
                    },
                  },
                  0,
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
      },
      {
        $sort: {
          hasInterview: -1, // เลือกเรียงลำดับโดยการมี interview ก่อน
          "applicants.time_stamp": -1, // จากนั้นเรียงตามเวลาที่ส่งสมัคร
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          Position: 1,
          Location: 1,
          JobDescription: 1,
          "applicants.applicantsID": 1,
          "applicants.userId": 1,
          "applicants.status": 1,
          "applicants.time_stamp": 1,
          "applicants.SelectAppointment": 1,
          "CompanyData.companyName": 1,
          "CompanyData.companyLocation": 1,
          "CompanyData.companyDetail": 1,
        },
      },
    ]);

    if (result.length != 0) {
      return res.status(200).json(result);
    } else {
      return res.status(204).json({
        message: "No Content",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = getAppliedJob;
