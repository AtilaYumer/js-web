const User = require('../models/User');

async function getUserByUsername(username) {
    return await User.findOne({ 'username': username });
}

async function createUser(body) {
    const user = new User({
        username: body.username,
        password: body.password
    });
    await user.save();
}

module.exports = {
    getUserByUsername,
    createUser
}