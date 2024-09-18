// models/post.js
const mongoose = require('mongoose');
const { type } = require('os');

// Define the Post schema
const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true, // Author of the quote
    },
    content: {
        type: String,
        required: true, // The actual quote text
    },
    type: {
        type: String,
        required: true, // The type of the post (e.g., quote, story, etc.)
    },
    tags: [String], // Array of tags related to the quote (e.g., motivation, life, etc.)
    createdAt: {
        type: Date,
        default: Date.now, // Automatically add the current date and time
    }
});

// Create the Post model from the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
