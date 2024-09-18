const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { response } = require('express');

// Handle Errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // Incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered';
    }

    // Incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'that password is incorrect';
    }

    // Duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

// Token creation
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'you can add everything', {
        expiresIn: maxAge,
    });
};

// Controller actions
module.exports.signup_post = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const user = await User.create({ firstname, lastname, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id }); // Added token in the response for debugging
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};


module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
      res.status(200).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
};

module.exports.login_get = (req, res) => {
    res.render('Login');
};

module.exports.signup_get = (req, res) => {
    res.render('signup');
};

module.exports.logout_get =(req , res)=>{
    res.cookie('jwt', '',{maxAge: 1});
    res.redirect('/');
 };
