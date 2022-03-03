const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    posts: { type: [Schema.Types.ObjectId], ref: 'Post', default: [] }
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