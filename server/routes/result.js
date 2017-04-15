/*
  File name: Result.js
  Group Number: Group 6
  Web App name: Survey Ocean
  Description: Responsible for routing survey
*/
let express = require('express');
let router = express.Router();
// Modules required for database
let mongoose = require('mongoose');
// module required for authentication
let passport = require('passport');
// Moments.js for time and date manipulation
let moment = require('moment');

// Async
let async = require('async');
// Defining the user model
let UserModel = require('../models/users');
let User = UserModel.User; // Alias for User Model - User object
// Survey Model
let SurveyModel = require('../models/surveys');
let McqsModel = SurveyModel.MCQS;
// True and False Question(s)
let TfQuestions = SurveyModel.TFQS;
let TfQuestion = SurveyModel.TFQ;

//define model for MC questions
let MCQSModel = require('../models/surveys').MCQS;
let MCQModel = require('../models/surveys').MCQ;
let MCModel = require('../models/surveys').MC;

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  } 
  next();
}

/* GET survey page. */
router.get('/', requireAuth, (req, res, next) =>{  
  let tfqs = [];
  let mcqs = [];
  async.parallel({
    one: function(callback){
      TfQuestions.find({createdBy:req.user._id},(err, model)=>{
        for (let i=0; i < model.length; i++){        
          tfqs.push(model[i]);
        }
        callback(null, tfqs);
      });
    },
    two: function(callback){
      McqsModel.find((err, mcqmodel) =>{
        for (let i=0; i < mcqmodel.length; i++){
          mcqs.push(mcqmodel[i]);
        }
        callback(null, mcqs);
      })
    }
  },
    (err, results) => {
      res.render('surveys/result/display', { 
        page: 'survey',
        title: 'Results - Survey Ocean',
        fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '',
        tfquestions: tfqs,
        mcquestions: mcqs,
        user: req.user ? req.user._id : '' 
      });  
    }
 );  
});
module.exports = router;