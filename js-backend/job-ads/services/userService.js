const User = require('../models/User');
const bcryptUtil = require('../util/bcryptUtil');

async function createUser(body) {
    const user = new User({
        email: body.email,
        password: await bcryptUtil.hashpassword(body.password),
        skills: body.skills
    });
    await user.save();

    return await User.findOne({ 'email': body.email });
}

async function findUserByEmail(email) {
    return await User.findOne({ 'email': email });
}

async function findById(id) {
    return await User.findById(id);
}

module.exports = {
    createUser,
    findUserByEmail,
    findById
}