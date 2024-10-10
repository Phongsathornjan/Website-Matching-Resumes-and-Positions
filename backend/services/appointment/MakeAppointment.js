const mongoose = require('mongoose');
const Post = require('../../model/post');

const MakeAppointment = async (req, res) => {
    try {
        const { userId, idPost } = req.params;
        const { Date1, Date2, Date3, Time1, Time2, Time3, InterviewType, MeetingLink } = req.body; // รับข้อมูลวันที่และเวลา
        if(!Date1 || !Date2 || !Date3 || !Time1 || !Time2 || !Time3 || !InterviewType || !MeetingLink){
            return res.status(400).json({
                message: 'All input is require'
            });
        }
        if (!idPost || !userId) {
            return res.status(400).json({
                message: 'idPost or userId is missing'
            });
        }

        // ค้นหา post ตาม idPost และค้นหา applicants ตาม userId และอัปเดตข้อมูล
        const updatedPost = await Post.findOneAndUpdate(
            {
                _id: idPost,
                "applicants.userId": new mongoose.Types.ObjectId(userId) // ค้นหา applicant ที่มี userId ตรงกัน
            },
            {
                $set: {
                    "applicants.$.status": "SelectAppointment", // อัปเดต status เป็น "appointment"
                    "applicants.$.SelectAppointment.Date1": Date1,
                    "applicants.$.SelectAppointment.Date2": Date2,
                    "applicants.$.SelectAppointment.Date3": Date3,
                    "applicants.$.SelectAppointment.Time1": Time1,
                    "applicants.$.SelectAppointment.Time2": Time2,
                    "applicants.$.SelectAppointment.Time3": Time3,
                    "applicants.$.SelectAppointment.InterviewType": InterviewType,
                    "applicants.$.SelectAppointment.MeetingLink": MeetingLink
                }
            },
            { new: true } // คืนค่า post ที่อัปเดตแล้ว
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: 'Post or applicant not found'
            });
        }

        return res.json({
            message: 'Appointment updated successfully',
            post: updatedPost
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

module.exports = MakeAppointment;
