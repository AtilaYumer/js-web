const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    skills: { type: String, required: true },
    ads: { type: [Schema.Types.ObjectId], ref: 'Ad', default: [] }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 1
    }
})

const User = model('User', userSchema);

module.exports = User;