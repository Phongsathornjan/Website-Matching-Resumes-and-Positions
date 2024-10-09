const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null},
    last_name: { type: String, default: null},
    email: {type: String, unique: true},
    password: { type: String},
    role: { type: String},
    location: { type: String},
    jobField: { type: String},
    token: { type: String},
    appliedJobs: [
        {
            jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, 
            appliedDate: { type: Date, default: Date.now }, 
            status: { type: String, default: 'pending' }  
        }
    ],

    //hr
    postedJobs: [
        {
            jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, 
        }
    ],
    companyName: { type: String, default: null},
    companyDetail: { type: String, default: null}
})

userSchema.index({
    first_name: 'text',
    last_name: 'text',
    companyName: 'text',
    companyDetail: 'text',
}, {
    weights: {
        first_name: 10,
        last_name: 5
    }
});

module.exports = mongoose.model('users',userSchema);