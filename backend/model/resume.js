const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    Output: [{
        Firstname: { type: String, required: true },
        Lastname: { type: String, required: true },
        university: { type: String, required: true },
        Experience: { type: String, required: true },
        skill: { type: String, required: true },
        summary: { type: String, required: true }
    }]
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
