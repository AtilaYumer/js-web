const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: { type: String, required: true },
    keyword: { type: String, required: true },
    location: { type: String, required: true },
    dateOfCreation: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    votes: [{ type: [Schema.Types.ObjectId], ref: 'User', default: [] }],
    rating: { type: Number, default: 0 }
});

const Post = model('Post', postSchema);

module.exports = Post;