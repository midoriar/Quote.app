// models/post.js
const mongoose = require('mongoose');
const { type } = require('os');

// Define the Post schema
const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true, 
    },
    content: {
        type: String,
        required: true, 
    },
    type: {
        type: String,
        required: true, 
    },
    tags: [String], 
    createdAt: {
        type: Date,
        default: Date.now, 
    }
});

// Create the Post model from the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
