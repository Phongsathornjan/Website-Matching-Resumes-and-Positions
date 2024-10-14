const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    HrId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    PostId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    Date: { type: String, required: true },
    Time: { type: String, required: true },
    InterviewType: { type: String, required: true },
    MeetingLink: { type: String, required: true },
    InterviewVer: { type: String, required: true },
});

module.exports = mongoose.model('appointment', appointmentSchema);
