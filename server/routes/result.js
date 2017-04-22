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
// Use JSON2CSV (https://www.npmjs.com/package/json-2-csv)
let convert = require('json-2-csv');

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
//let MCQSModel = require('../models/surveys').MCQS;
//let MCQModel = require('../models/surveys').MCQ;
//let MCModel = require('../models/surveys').MC;

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
      McqsModel.find({createdBy:req.user._id},(err, mcqmodel) =>{
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


/* EXPORT JSON TO CSV */
let json2csvCallback = (err, csv) => {
  if (err) throw err;
  
  console.log(csv);
}

//Export TF Survey
router.get('/export', function(req, res){
  let id = req.params.id;
  let tfqs = [];
  let exportArray = [];
  TfQuestions.find({createdBy:req.user._id},(err, model)=>{
    // Pushing t/f surveys into tfqs array
    for (let i=0; i < model.length; i++){        
      tfqs.push(model[i]);
    }
    // Loop to iterate through length of tfqs array (how many surveys are there)
    for (let j=0; j < tfqs.length; j++){
      let sTitle = tfqs[j].title;
      // Array with questions
      let questions = tfqs[j].questions;
      let formated = [];
      // To add formatted contents to formated array
      for (let k = 0; k < questions.length; k++){
        formated.push({
          Question: questions[k].question,
          True: questions[k].true,
          False: questions[k].false
        })
      }
      // put formatted question per t/f survey question into exportArray
      exportArray.push({
        Title: sTitle,
        Questions: formated
      })
    }
    // Creates and exports csv file
    let csvfile = convert.json2csv(exportArray, (err, csv)=>{
      res.setHeader('Content-disposition', 'attachment; filename=' + req.user.firstname + '_' + req.user.lastname + 'Surveys.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
    });
  });
});

//Export MC Survey
router.get('/exportMc', function(req,res){

  let id = req.params.id;
  let mcqs = [];
  let exportArray = [];
  McqsModel.find({createdBy:req.user._id}, (err,model) => {
    console.log("MODEL:" + model);
    //push mcq surveys into mcqs array
    for (let i=0; i < model.length; i++){
      mcqs.push(model[i]);
    }
    //finding each surveys in mcqs array
    for (let j = 0; j < mcqs.length; j++) {
      let sTitle = mcqs[j].title;

      //creating arrays for each questions
      let questions = mcqs[j].questions;
      let formatted = [];
      for (let k = 0; k < questions.length; k++){
        let options = questions[k].options;
        //array for each options
        let option = [];
        //for each of the options option name and counter, push to options array
        for(let l = 0; l < options.length; l++){
          option.push({
            Option: questions[k].options[l].option,
            Counter: questions[k].options[l].counter
          });          
        }

        formatted.push({
          Question: questions[k].question,
          Options: option
        });
      }

      exportArray.push({
        Title:sTitle,
        Questions:formatted
      })     
    }

    
    // Creates and exports csv file
    let csvfile = convert.json2csv(exportArray, (err, csv)=>{
      res.setHeader('Content-disposition', 'attachment; filename=' + req.user.firstname + '_' + req.user.lastname + 'MC_Surveys.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
    });
  });
});

module.exports = router;