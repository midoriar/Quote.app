const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

const port = 3000;
app.listen(port);
console.log(`Server running at http://localhost:${port}`);

//routes

app.get('/', (req, res) => { res.render('home')})
app.get('/signup', (req, res) => {res.render('signup')});
app.get('/login', (req, res) => {res.render('Login')});
app.get('/add_post', (req, res) => {res.render('add_post')});
app.get('/main', (req, res) => {res.render('main')});
app.get('/story', (req, res) => {res.render('story')});
app.get('/account', (req, res) => {res.render('account')});
app.post('/signup', (req, res) => {});
app.post('/login', (req, res) => {});