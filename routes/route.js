const express = require('express');
const router = express.Router();
const Post = require('../models/post'); // Import the Post model
const {requireAuth, checkUser}= require('../middleware/middlewareauth')

// Create a new post
router.post('/posts', async (req, res) => {
    try {
        const newPost = new Post({
            author: req.body.author,
            content: req.body.content,
            type: req.body.type,
            tags: req.body.tags,
        });
        const savedPost = await newPost.save();
        console.log(savedPost);
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all posts of a specific type
router.get('/main/:type', requireAuth, async (req, res) => {
    try {
        if (req.params.type === 'all') {
            const posts = await Post.find();
            res.render('main', { posts , type: req.params.type});
        } else if (req.params.type === 'story' || req.params.type === 'quote') {
        const posts = (await Post.find()).filter(post => post.type === req.params.type);
        res.render('main', { posts , type: req.params.type});
        } else {
            res.status(400).json({ message: 'Invalid post type' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Update a post
router.put('/posts/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a post
router.delete('/posts/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const authController = require('../controllers/authControllers');


// GET routes for rendering signup and login pages
router.get('/signup', authController.signup_get);
router.get('/login', authController.login_get);

// POST routes for handling signup and login logic
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;
