const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
        university: { type: String, required: true },
        Experience: { type: String, required: true },
        skill: { type: String, required: true },
        summary: { type: String, required: true },
        userId: { type: String, required: true ,unique: true},
});

module.exports = mongoose.model('Resume', resumeSchema);
