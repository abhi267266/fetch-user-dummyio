const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    title: String,
    firstName: String,
    lastName: String,
    picture: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
