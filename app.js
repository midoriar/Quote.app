
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { ObjectId } = require("mongodb");
const {requireAuth, checkUser}= require('./middleware/middlewareauth')

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/Quote')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port);
        console.log(`Server running at http://localhost:${port}`);
    })
    .catch((error) => console.error('Could not connect to MongoDB:', error));

const port = 3000;


// Apply to protected routes
app.get('*', checkUser);
app.get('/', (req, res) => { res.render('home')});
app.get('/main',requireAuth, (req, res) => { res.redirect('/main/quote') });
app.get('/add_post',requireAuth, (req, res) => { res.render('add_post') });
app.get('/account',requireAuth, (req, res) => {res.render('account')});
// Import the post routes
const postRoutes = require('./routes/route'); // Adjust path if necessary
app.use('/', postRoutes); // Mount the post routes under the '/api' path
