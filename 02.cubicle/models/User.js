const { Schema, model } = require("mongoose");
const userUtil = require('../util/userUtil');

const userSchema = new Schema({
    username: { type: String, required: true, maxlength: 40 },
    password: { type: String, required: true }
});

userSchema.methods.comparePassword = async function (passwordToCheck) {
    return await userUtil.comparePassword(passwordToCheck, this.password);
}

userSchema.pre('save', async (next) => {
    await userUtil.hashpassword(this.password);
    next();
});

const User = model('User', userSchema);

module.exports = User;