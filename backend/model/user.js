const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null},
    last_name: { type: String, default: null},
    email: {type: String, unique: true},
    password: { type: String},
    role: { type: String},
    phone: { type: String},
    location: { type: String},
    company_name: { type: String},
    token: { type: String},
})

module.exports = mongoose.model('users',userSchema);