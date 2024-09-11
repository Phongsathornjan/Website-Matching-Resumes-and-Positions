const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
        userId: { type: String, required: true },
        Position: { type: String, required: true },
        Salary: { type: String, required: true },
        WorkField: { type: String, required: true },
        Location: { type: String, required: true },
        Requirements: { type: String, required: true },
        Qualifications: { type: String, required: true },
        Experience: { type: String, required: true },
        time_stamp: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);
