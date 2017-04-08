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

/* GET home page. */
router.get('/', (req, res, next) =>{  
  let questions = [];
  let q;
  let p
  async.parallel({
    one: function(callback){
      TfQuestions.find((err, model)=>{
        for (let i=0; i < model.length; i++){
          questions.push(model[i].questions);
        }
        callback(null, questions);
      });
    }},
    (err, results) => {
      res.render('surveys/index', { 
        page: 'survey',
        title: 'Survey - Survey Ocean',
        fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '',
        tfquestions: questions
      });  
    }
 );

  
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