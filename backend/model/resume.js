const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
        Experience: { type: String, required: true },
        keyword: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

resumeSchema.index({
        Experience: 'text',
        keyword: 'text',
    }, {
        weights: {
            Experience: 5,   
            keyword: 5      
        }
    });

module.exports = mongoose.model('Resume', resumeSchema);
