// routes/route.js
const { Router } = require('express');
const authController = require('../controllers/authControllers');

const router = Router();

// GET routes for rendering signup and login pages
router.get('/signup', authController.signup_get);
router.get('/login', authController.login_get);

// POST routes for handling signup and login logic
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;
