const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  Position: { type: String, required: true },
  Salary: { type: String, required: true },
  WorkField: { type: String, required: true },
  Location: { type: String, required: true },
  JobDescription: { type: String, required: true },
  Qualifications: { type: String, required: true },
  status: { type: String, required: true },
  Experience: { type: String, required: true },
  time_stamp: { type: String, required: true },
  applicants: [
    {
      applicantsID: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      userId: { type: String, required: true },
      time_stamp: { type: String, required: true },
      status: { type: String, default: "pending" },
      SelectAppointment: {
        type: new mongoose.Schema(
          {
            Date1: { type: String }, // วันที่ 1
            Date2: { type: String }, // วันที่ 2
            Date3: { type: String }, // วันที่ 3
            Time1: { type: String }, // เวลา 1
            Time2: { type: String }, // เวลา 2
            Time3: { type: String }, // เวลา 3
            InterviewType: { type: String },
            MeetingLink: { type: String },
            InterviewVer: { type: String },
          },
          { _id: false }
        ), // ปิด _id ของ schema ภายใน
      },
    },
  ],
  Degree: { type: String, required: true },
  Skill: { type: String, required: true },
  keyExperience: { type: String, required: true },
});

postSchema.index(
  {
    Position: "text",
    Salary: "text",
    JobDescription: "text",
    Qualifications: "text",
    Experience: "text",
  },
  {
    weights: {
      Position: 8,
      Salary: 5,
      JobDescription: 5,
      Qualifications: 5,
      Experience: 5,
    },
  }
);

module.exports = mongoose.model("Post", postSchema);
