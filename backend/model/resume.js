const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
        Experience: { type: String, required: true },
        Skill: { type: String, required: true },
        Degree: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

resumeSchema.index({
        Experience: 'text',
        Skill: 'text',
        Degree: 'text',
    }, {
        weights: {
            Experience: 5,   
            Degree: 5,
            Skill: 5,  
        }
    });

module.exports = mongoose.model('Resume', resumeSchema);
