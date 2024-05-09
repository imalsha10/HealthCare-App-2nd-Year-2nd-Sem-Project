const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const loginSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'], // Define possible roles
        default: 'user' // Set default role
    }
});

loginSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Log', loginSchema);
