const User = require('../models/User');
const bcryptUtil = require('../util/bcryptUtil');

async function createUser(body) {
    const user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: await bcryptUtil.hashpassword(body.password)
    });
    await user.save();

    return User.find({ 'email': body.email });
}

async function findUserByEmail(email) {
    return await User.findOne({ 'email': email });
}

module.exports = {
    createUser,
    findUserByEmail
}