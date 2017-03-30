/*
  File name: index.js
  Group Number: Group 6
  Web App name: Survey Ocean
  Description: Main content routing
*/

// modules required for routing
let express = require('express');
let router = express.Router();
// module required for authentication
let passport = require('passport');
// Defining the user model
let UserModel = require('../models/users');
let User = UserModel.User; // Alias for User Model - User object

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('content/index', { 
    title: 'Survey Ocean',
    page: 'main',
    // if req.user not null, displayName or ''
    displayName: req.user ? req.user.displayName : '' 
  });
});

// GET login page
router.get('/login', (req, res, next)=>{
  // check to see if the user is not already logged in
  if(!req.user) {
    // render the login page
    res.render('auth/login', {
      title: "Login",
      page: "login",
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    return res.redirect('/');
  }
});

module.exports = router;
