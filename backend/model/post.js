const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },        
    Position: { type: String, required: true },      
    Salary: { type: String, required: true },        
    WorkField: { type: String, required: true },     
    Location: { type: String, required: true },      
    Requirements: { type: String, required: true },  
    Qualifications: { type: String, required: true }, 
    Experience: { type: String, required: true },    
    time_stamp: { type: String, required: true },    
    applicants: [                                   
        {
            userId: { type: String, required: true },  
            appliedDate: { type: Date, default: Date.now }, 
            status: { type: String, default: 'pending' }   
        }
    ],
    keyword: { type: String, required: true },
    Experience: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);
