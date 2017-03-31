/*
  File name: app.js
  Group Number: Group 6
  Web App name: Survey Ocean
  Description: The main configuration file for Express app
*/
// Imports the express framework into the app
let express = require('express');
let path = require('path');
// Favison: For serving favicon
let favicon = require('serve-favicon');
let logger = require('morgan');
// Cookie Parser: Middleware that helps with handling cookies
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

/* MODULE FOR AUTHENTICATION */
let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let LocalStrategy = passportlocal.Strategy;
let flash = require('connect-flash');

/* MONGO DB */
let mongooseConfig = require("./config/mongo")
let mongoose = require("mongoose");
mongoose.connect(process.env.URI||mongooseConfig.URI, (err) => {
  if (err){
    console.log("Error connecting to the Mongo Database");
  } else {
    console.log("Connected to MongoDB");
  }
});

/* 
ROUTERS 
*/
let index = require('./routes/index');
let about = require('./routes/about');
let contact = require('./routes/contact');
let survey = require('./routes/survey');

let app = express();

/* View engine setup
-- This tells Express to use EJS templating engine and use the /views folder
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json()); // Allows ability to parse json
app.use(bodyParser.urlencoded({ extended: false })); // Allows app to read data from URL
app.use(cookieParser());
// ../Client is directory where images, stylesheets, and scripts will be stored
app.use(express.static(path.join(__dirname, '../client')));

/*
** Setup session
*/
app.use(session({
  secret: "OceanSurveyRegistrationSecret",
  saveUninitialized: true,
  resave: true
}));

/* Initializing passport */
app.use(passport.initialize());
app.use(passport.session());
/* Initializing flash */
app.use(flash()); 

/*
** Routing
*/
app.use('/', index);
app.use('/about', index);
app.use('/contact', index);
app.use('/survey', survey);

/*
** Passport User Configuration
*/

let UserModel = require('./models/users');
let User = UserModel.User; 
passport.use(User.createStrategy());
// Store User object in the session
passport.serializeUser(User.serializeUser());
// Matches key
passport.deserializeUser(User.deserializeUser());




// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // If environment is 'dev', then display err message
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
