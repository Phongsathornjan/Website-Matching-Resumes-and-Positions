const moongoose = require('mongoose');

const userSchema = new moongoose.Schema({
    first_name: { type: String, default: null},
    last_name: { type: String, default: null},
    email: {type: String, unique: true},
    password: { type: String},
    role: { type: String},
    phone: { type: String},
    company_name: { type: String},
    token: { type: String},
})

module.exports = moongoose.model('users',userSchema);