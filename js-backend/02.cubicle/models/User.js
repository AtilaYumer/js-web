const { Schema, model } = require("mongoose");
const userUtil = require('../util/userUtil');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        maxlength: [40, 'Username should be less than 40 characters.'],
        minlength: [5, 'Username should be more than 5 charachters.'],
        validate: {
            validator: function (v) {
                return /^[A-Za-z][A-Za-z0-9\s]*$/.test(v);
            },
            message: "Username should contain only English letters and digits."
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 1
    }
});

userSchema.methods.comparePassword = async function (passwordToCheck) {
    return await userUtil.comparePassword(passwordToCheck, this.password);
}

userSchema.pre('save', async function (next) {
    this.password = await userUtil.hashpassword(this.password);
    next();
});

const User = model('User', userSchema);

module.exports = User;