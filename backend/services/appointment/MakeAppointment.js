const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const Post = require("../../model/post");
const User = require("../../model/user");

const MakeAppointment = async (req, res) => {
  try {
    const { userId, idPost } = req.params;
    const {
      Date1,
      Date2,
      Date3,
      Time1,
      Time2,
      Time3,
      InterviewType,
      MeetingLink,
      InterviewVer,
    } = req.body; // รับข้อมูลวันที่และเวลา
    if (
      !Date1 ||
      !Date2 ||
      !Date3 ||
      !Time1 ||
      !Time2 ||
      !Time3 ||
      !InterviewType ||
      !MeetingLink ||
      !InterviewVer
    ) {
      return res.status(400).json({
        message: "All input is require",
      });
    }
    if (!idPost || !userId) {
      return res.status(400).json({
        message: "idPost or userId is missing",
      });
    }

    // ค้นหา post ตาม idPost และค้นหา applicants ตาม userId และอัปเดตข้อมูล
    const updatedPost = await Post.findOneAndUpdate(
      {
        _id: idPost,
        "applicants.userId": new mongoose.Types.ObjectId(userId), // ค้นหา applicant ที่มี userId ตรงกัน
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
          "applicants.$.SelectAppointment.MeetingLink": MeetingLink,
          "applicants.$.SelectAppointment.InterviewVer": InterviewVer,
        },
      }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post or applicant not found",
      });
    }

    const userEmail = await User.findById({
      _id: new mongoose.Types.ObjectId(userId),
      email: 1,
    });

    const PostDetail = await Post.findById({
      _id: new mongoose.Types.ObjectId(idPost),
      Position: 1,
    }).populate({
      path: "userId",
      select: "companyName companyDetail",
    });

    if (!userEmail) {
      return res.status(400).json({
        message: "Not found user",
      });
    }

    // สร้าง transporter ที่จะใช้งานกับบริการส่งอีเมล (ใช้ App Password)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "test.resumeunion@gmail.com", // อีเมลของคุณ
        pass: "srie pwxd wjab ouwp", // ใช้ App Password ที่สร้างจาก Google
      },
    });

    // ตั้งค่าอีเมล
    let mailOptions = {
      from: "test.resume@gmail.com", // ผู้ส่ง
      to: userEmail.email, // ผู้รับ
      subject: `เลือกวันสัมภาษณ์ ตำแหน่ง ${PostDetail.Position}`,
      text: `บริษัท ${PostDetail.userId.companyName} ได้นัดสัมภาษณ์คุณ`,
      html: `
               <div>บริษัท ${PostDetail.userId.companyName} ได้นัดสัมภาษณ์คุณ</div>
               <div> </div>
               <div><b>โดยทางบริษัทมีวันและเวลาว่างให้คุณเลือก 3 วัน</b></div>
               <div> </div>
               <div>- วันที่ ${Date1} เวลา ${Time1}</div>
               <div>- วันที่ ${Date2} เวลา ${Time2}</div>
               <div>- วันที่ ${Date3} เวลา ${Time3}</div>
               <div> สัมภาษณ์แบบ ${InterviewType}</div>
               <div>Meeting Link : ${MeetingLink} เวลา ${Time3}</div>
               <div>ผู้สัมภาษณ์ ${InterviewVer}</div>
               <div>เข้าไปที่เว็บไซต์เพื่อเลือกวันสัมภาษณ์ได้เลย!</div>
        `,
    };

    // ส่งอีเมล
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
          message: "Error to sending email",
        });
      } else {
        return res.status(200).json({
          message: "Success",
        });
      }
    });

    return res.json({
      message: "Appointment updated successfully",
      post: updatedPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = MakeAppointment;
