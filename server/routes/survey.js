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
router.get('/', (req, res, next) =>{  
  let tfqs = [];
  let mcqs = [];
  async.parallel({
    one: function(callback){
      TfQuestions.find((err, model)=>{
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
      res.render('surveys/index', { 
        page: 'survey',
        title: 'Survey - Survey Ocean',
        fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '',
        tfquestions: tfqs,
        mcquestions: mcqs
      });  
    }
 );  
});

/* GET view survey page */
router.get('/tfsurvey/:id', (req, res, next) =>{
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
          console.log("Questions: " + questions[i]);
        }
        // If no error
        res.render('surveys/respond/tfsurvey', {
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

/*Respond to true and false survey*/
router.post('/tfsurvey/:id', (req, res, next) =>{
  // Set local id as id from req
  let surveyid = req.params.id;
  let numQuestions; // Holds number of questions in the survey
  let surveyQuestions; // Holds survey's question JSON object
  let parsedJSON; // Holds parsed JSON string
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
      // Parses req.body when submit button is clicked
      parsedJSON = JSON.parse(JSON.stringify(req.body));
        // For loop to iterate through all the questions
      for (let i = 0; i < numQuestions; i++){
        // Holds _id of the question (1 question inside TFQuestions)
        let questionid = surveyQuestions[i]._id;
        // True and False value
        let trueV = question.questions[i].true;
        let falseV = question.questions[i].false;

        // If parsedJSON's key (_id for TfQuestion) value is true
        if (parsedJSON[questionid] == 'true'){
          question.questions[i].true = trueV + 1;
          //console.log(surveyQuestions[i].question);
        } else {
          question.questions[i].false = falseV + 1;
        }
      }
      question.save();      
    }
  });
  // JUST TO TEST
  res.redirect('/');
}
);

/* GET view survey page for multiplechoice */
router.get('/mcsurvey/:id', (req, res, next) =>{
  try {
    let id = req.params.id;
    // Find by ID
    McqsModel.findById(id, (err, question) => {
      // If error
      if (err) {
        return console.error(err);
      } else {
        let questions = [];
        for (let i = 0; i < question.questions.length; i++){
          // Stores mc questions into questions array
          questions.push(question.questions[i]);
          console.log("Questions: " + questions[i]);
        }
        // If no error
        res.render('surveys/respond/mcsurvey', {
          page: 'mcsurvey',
          title: 'Survey - Survey Ocean',
          fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '',
          mcquestion: question,
          mcquestions: questions
        });
      }
    })
  } catch (err) {
    // Log error
    return console.error(err);
  }
});

/* Create new survey */
router.get('/createNew', requireAuth, (req, res, next) =>{
  res.render('surveys/create', {
     page: 'survey',
     title: 'Survey - Survey Ocean',
     fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '' 
  });
})

/* View Create new MC survey */
router.get('/mcq', requireAuth, (req, res, next) =>{
  //# of questions
  let mcqty = 10;
  //# of mc options
  let mcoqty = 4;
  let mcSurvey = new MCQSModel();
  let mcQuestions = [];
 

  //For every question, push a new object -- 10 max questions
  for(let i = 0; i < mcqty; i++){
    let mcquestion = new MCQModel();
    let mcOption = [];
    //For every multiple choice options, push a new object -- 4 max options
    for (let j = 0; j < mcoqty; j++) {
      mcOption.push(new MCModel);    
    }
    mcquestion.options = mcOption;
    mcQuestions.push(mcquestion);   
  }
  mcSurvey.questions= mcQuestions;

  //render view to surveys/mcq
  res.render('surveys/mcq', {
    title:'MC Survey - Survey Ocean',
    fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '',
    totalQuestions:mcqty,
    totalOptions:mcoqty,
    mcq:mcQuestions,
    currentDate: moment().format('YYYY-MM-D'),
    maxDate: moment().add(1, "month").format('YYYY-MM-D'),
    currentTime: moment().format('HH:mm')
  });
});

/* Create a new MC Survey */
/* View create new MC Survey */
router.post('/mcq', requireAuth,(req,res,next) => {
  //# of mcquestions
  let mcqty = 10;
  let sTitle = req.body.surveytitle;
  let duration = req.body.duration;
  let parsedJSON = JSON.parse(JSON.stringify(req.body));
  let parsedJSONOption = JSON.parse(JSON.stringify(req.body,replace));
  let aQuestions = [];

  //function that looks for any values that is an array type
  function replace(key,value){
    if(typeof value === 'array')
    {
      return undefined;
    }
    return value;
  } 

  for(let i = 0; i < mcqty; i++) {
    let aOptions = [];   
    if(parsedJSON['question '+ i].trim != ''){
        for(let a = 0; a < 5; a++){    
          if(parsedJSONOption['option' + i + '_' + a]) {
            console.log(parsedJSONOption);
            aOptions.push(new SurveyModel.MC({
            option: parsedJSONOption['option' + i + '_' + a],
            counter:0
            }));
          }
        }
        aQuestions.push(new SurveyModel.MCQ({
        question: parsedJSON['question '+ i],
        options: aOptions
      }));
    }     
  }
  
  let mcSurvey = new SurveyModel.MCQS({
    title: sTitle,
    questions: aQuestions,
    surveyType:'mcq',
    expireAt: new Date(Date.now() + duration*60*60*1000)
  });
  //send data to mlab
  mcSurvey.save(mcSurvey,(err,mcqs) => {
    if(err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect('/');
    }
  })

});


/* View create new t/f survey */
router.get('/tfq', requireAuth, (req, res, next) =>{
  // Total number of t/f questions
  let tfqQty = 10;
  // Create a true and false question object for the Qty #.  Example 10
  res.render('surveys/tfq', {
     title: 'T/F Survey - Survey Ocean',
     fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '' ,
     totalQuestions: tfqQty,
     currentDate: moment().format('YYYY-MM-D'),
     maxDate: moment().add(1, "month").format('YYYY-MM-D'),
     currentTime: moment().format('HH:mm')
  });
}) 

/* Create a new t/f survey */
/* View create new t/f survey */
router.post('/tfq', requireAuth, (req, res, next) =>{
  // Total number of t/f questions
  let tfqQty = 10;
  let stitle = req.body.surveytitle; // Name of survey
  let duration = req.body.duration; // Duration in hours (MAX 48)
  let parsedJSON; // Holds parsed JSON string
  parsedJSON = JSON.parse(JSON.stringify(req.body));
    
  let aQuestions = [];  

  for (let i = 0; i < 10; i++){    
    // If question is not entered, do not create an object
    if (parsedJSON['question'+i].trim() != ''){
      
      aQuestions.push(new SurveyModel.TFQ({
      question: parsedJSON['question'+i],
      true:0,
      false:0
      }));
    }  
  }
  let tfSurvey = new SurveyModel.TFQS({
    title: stitle,
    questions: aQuestions,
    surveyType: "tfq",
    expireAt: new Date(Date.now() + duration*60*60*1000),
    createdBy: req.user._id
  });

  tfSurvey.save(tfSurvey, (err, tfqs) => {
    if (err){
      console.error(err);
      res.end(err);
    } else {
      res.redirect('/');
    }
  })
})

module.exports = router;

