const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
        userId: { type: String, required: true },
        topic: { type: String, required: true },
        position: { type: String, required: true },
        salary: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        time_stamp: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);
