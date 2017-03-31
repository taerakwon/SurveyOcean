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
    // if req.user not null, fullname or ''
    fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '' 
  });
});

// GET login page
router.get('/login', (req, res, next)=>{
  // check to see if the user is not already logged in
  if(!req.user) {
    // render the login page
    res.render('auth/login', {
      title: "Login - Survey Ocean",
      page: "login",
      messages: req.flash('loginMessage'),
      fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '' 
    });
    return;
  } else {
    // If logged in
    return res.redirect('/');
  }
});

// POST /login - process the login attempt
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: 'Incorrect username / password'
}));

// GET /logout - process the logout request
router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/'); // redirect to the home page
});

// GET /register - render the registration view
router.get('/register', (req, res, next)=>{
   // check to see if the user is not already logged in
    if(!req.user) {
    // render the registration page
      res.render('auth/register', {
      title: "Register - Survey Ocean",
      page: 'register',
      messages: req.flash('registerMessage')
    });
    return;
  } else {
    return res.redirect('/'); // redirect to main
  }
});

// POST / register - process the registration submission
router.post('/register', (req, res, next)=>{
  User.register(
    new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    }),
    req.body.password,
    (err) => {
      if(err) {
        console.log('Error creating a new user');
        if(err.name == "UserExistsError") {
          req.flash('registerMessage', 'Registration Error: User Already Exists');
        }
        return res.render('auth/register', {
          title: "Register - Survey Ocean",
          page: 'register',
          messages: req.flash('registerMessage'),
          fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '' 
        });
      }
      // if registration is successful
      return passport.authenticate('local')(req, res, ()=>{
        res.redirect('/');
      });
    });
});
module.exports = router;
