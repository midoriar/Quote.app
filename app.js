const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

const port = 3000;
app.listen(port);
console.log('listening on port 3000');

//routes

app.get('/', (req, res) => { res.render('home')})
app.get('/signup', (req, res) => {res.render('signup')});
app.get('/login', (req, res) => {res.render('Login')});
app.get('/home', (req, res) => {});
app.post('/signup', (req, res) => {});
app.post('/login', (req, res) => {});