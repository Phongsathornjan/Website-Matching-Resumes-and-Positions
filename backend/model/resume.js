const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
        Experience: { type: String, required: true },
        keyword: { type: String, required: true },
        userId: { type: String, required: true ,unique: true},
});

module.exports = mongoose.model('Resume', resumeSchema);
