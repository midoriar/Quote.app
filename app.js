
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/route');
const cookieParser = require('cookie-parser');
const { ObjectId } = require("mongodb");
const {requireAuth, checkUser}= require('./middleware/middlewareauth')

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
// database connection
const dbURI = "mongodb+srv://ramijwt:test1234@cluster0.ro21q.mongodb.net/jwt";
mongoose.connect(dbURI)
  .then((result) => {
    app.listen(3000);
    console.log('connected to cluster');
  })
  .catch((err) => console.log('fail'));

// Apply to protected routes
app.get('*', checkUser);
app.get('/add_post',requireAuth, (req, res) => { res.render('add_post') });
app.get('/', (req, res) => { res.render('home')})
app.get('/main', requireAuth,(req, res) => {res.render('main')});
app.get('/story', requireAuth, (req, res) => {res.render('story')});
app.get('/saves',requireAuth, (req, res) => {res.render('saves')});
app.get('/account',requireAuth, (req, res) => {res.render('account')});
app.use(authRoutes);