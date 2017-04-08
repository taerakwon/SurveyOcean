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
router.get('/', (req, res, next) =>{  
  let tfqs = [];
  async.parallel({
    one: function(callback){
      TfQuestions.find((err, model)=>{
        for (let i=0; i < model.length; i++){
          tfqs.push(model[i]);
        }
        callback(null, tfqs);
      });
    }},
    (err, results) => {
      res.render('surveys/index', { 
        page: 'survey',
        title: 'Survey - Survey Ocean',
        fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '',
        tfquestions: tfqs
      });  
    }
 );  
});

/* GET view survey page */
router.get('/:id', (req, res, next) =>{
  try {
    let id = req.params.id;
    // Find by ID
    TfQuestions.findById(id, (err, question) => {
      // If error
      if (err) {
        return console.error(err);
      } else {
        let questions = [];
        for (let i = 0; i < question.questions.length; i++){
          questions.push(question.questions[i]);
        }
        // If no error
        res.render('surveys/answer/tfsurvey', {
          page: 'tfsurvey',
          title: 'Survey - Survey Ocean',
          fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '',
          tfquestion: question,
          tfquestions: questions
        });
      }
    })
  } catch (err) {
    // Log error
    return console.error(err);
  }
});

/*Respond to survey answer*/
router.post('/:id', (req, res, next) =>{
  // Set local id as id from req
  let surveyid = req.params.id;
  let numQuestions; // Holds number of questions in the survey
  let surveyQuestions; // Holds survey's question JSON object
  // Finds the survey by id
  TfQuestions.findById(surveyid, (err, question) => {
    // If err
    if (err) {
      console.error(err);
    } else {
      // Number of question in this survey
      numQuestions = question.questions.length;
      // surveyQUestions stores JSON objects for questions
      surveyQuestions = question.questions;
        // For loop to iterate through all the questions
      for (let i = 0; i < surveyQuestions.length; i++){
        console.log(surveyQUestions[i]); // Trying to target element.. having challenges
      }
    }
  });
});


/* Create new survey */
router.get('/createNew', requireAuth, (req, res, next) =>{
  res.render('surveys/create', {
     page: 'survey',
     title: 'Survey - Survey Ocean',
     fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '' 
  });
})

/* Create new MC survey */
router.get('/mcq', requireAuth, (req, res, next) =>{
  let mcqty = 10;
  let mccqty = 4;
  let mcquestions = [];
  let mcs = [];
  for(let i=0;i<mcqty;i++){
    mcquestions.push(new MCQModel);
  }
  for (let i=0;i<mccqty;i++){
    mcs.push(new MCQSModel);
  }
  let mcquestion = new MCQSModel();
  let mc = new MCQModel();  
  mcquestion.questions = mcquestions;
  mc.options= mcquestions;
  
  //testing purposes will delete when complete
  console.log("page holder " + mcquestion._id);
  console.log("each mc questions " + mcquestion.questions);
  console.log("each mc options " + mc.options);
  console.log("holder all " + mcquestion);  
  console.log("getting first question id "+ mcquestions[0]._id);
  console.log("mc option id " + mcs[0]._id);

  console.log("print mc" + mc);
  
  //render view to surveys/mcq
  res.render('surveys/mcq', {
    title:'MC Survey - Survey Ocean',
    fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '',
    mcq: mcquestion,
    mcqs: mcquestions,
    mc: mc
  });
})

/* Create new survey */
router.get('/tfq', requireAuth, (req, res, next) =>{
  res.render('surveys/tfq', {
     title: 'T/F Survey - Survey Ocean',
     fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '' 
  });
})


module.exports = router;