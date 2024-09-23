const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
        Experience: { type: String, required: true },
        keyword: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

module.exports = mongoose.model('Resume', resumeSchema);
