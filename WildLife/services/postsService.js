const Post = require('../models/Post');

async function getAllPosts() {
    return await Post.find().lean();
}

async function createPost(body, userId) {
    const post = new Post({
        title: body.title,
        keyword: body.keyword,
        location: body.location,
        dateOfCreation: body.dateOfCreation,
        imageUrl: body.imageUrl,
        description: body.description,
        author: userId,
    });
    await post.save();
}

async function getPostById(id) {
    return await Post.findById(id).populate('author').lean();
}

module.exports = {
    getAllPosts,
    createPost,
    getPostById
}