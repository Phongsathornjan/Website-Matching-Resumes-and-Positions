const appointment = require("../../model/appointment");
const Post = require('../../model/post');

const CreateInterviewAppointment = async (req, res) => {
    try{

        const {
            applicantsID,
            userId,
            HrId,
            Date,
            Time,
            InterviewType,
            MeetingLink,
            InterviewVer,
            Position,
            PostId
          } = req.body;
        
          if(!applicantsID || !userId || !HrId || !Date || !Time || !InterviewType || !MeetingLink || !InterviewVer || !Position || !PostId){
            return res.status(400).json({
                message: 'All input is require'
            })
          }
        
          const CreateAppointment = await appointment.create({
            _id: applicantsID,
            userId: userId,
            HrId: HrId,
            Date: Date,
            Time: Time,
            InterviewType: InterviewType,
            MeetingLink: MeetingLink,
            InterviewVer: InterviewVer,
            PostId: PostId
          })

          await Post.updateOne(
            { _id: PostId }, 
            {
              $pull: {
                applicants: { 
                    applicantsID: applicantsID }, 
              },
            }
          );

          return res.status(200).json({
            CreateAppointment,
            message: 'success'
          })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

};

module.exports = CreateInterviewAppointment;