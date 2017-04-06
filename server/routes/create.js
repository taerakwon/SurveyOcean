/*
  File name: SURVEY.js
  Group Number: Group 6
  Web App name: Survey Ocean
  Description: Responsible for routing survey page
*/
let express = require('express');
let router = express.Router();
// Modules required for database
let mongoose = require('mongoose');
// module required for authentication
let passport = require('passport');
// Defining the user model
let MCQModel = require('../models/mcqsurveys');
let TFQModel = require('../models/tfqsurveys');
let mcqSurvey = MCQModel.MCQSurvey;
let tfqSurvey = TFQModel.TFQSurvey; 

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* ADD NEW SURVEY */
router.post('/add', (req, res, next) =>{
  mcqSurvey.create({
  })
});

module.exports = router;