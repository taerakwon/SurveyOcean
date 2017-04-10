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
let SurveyModel = require('../models/surveys');

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

/* ADD NEW SURVEY */
router.get('/add', requireAuth, (req, res, next) =>{
  let tfq = new SurveyModel.TFQ({
    question: "Testing Data First Question",
    true: 0,
    false: 0
  });

  let tfq1 = new SurveyModel.TFQ({
    question: "This is second question",
    true: 0,
    false: 0
  });

  let tfqs = new SurveyModel.TFQS({
    title: "What do you think about Centennial?",
    questions: [tfq, tfq1],
    createdBy: req.user._id,
    surveyType: "tfq",
    expire: 'July 22, 2017 14:00:00'
  })

  tfqs.save(tfqs, (err, tfqs) => {
    if (err){
      console.log(err);
      res.end(err);}
      else{
        res.redirect('/');
      }
    }
  );
});

/* POST - ADD NEW SURVEY - MCQ */
router.post('/add', requireAuth, (req, res, next) => {
  
});

/* GET - Create a new MC Survey */
router.get('/',requireAuth,(req,res,next) => {
  let mcqty = 10;
  let mcquestions = [];
  let mcs = [];
  for(let i=0;i<mcqty;i++){
    mcs.push(new MCQSModel)
  }
  for(let i=0;i<mcqty;i++){
    mcquestions.push(new MCQModel);
  }
  let mcquestion = new MCQSModel();
  
  mcquestion.questions = mcquestions;
  console.log("page holder" + mcquestion._id);
  console.log("each mc questions" + mcquestion.questions);
  
  console.log("getting first question id "+ mcquestions[0]._id);

  res.render('surveys/mcq', {
    title:'MC Survey - Survey Ocean',
    fullname: req.user ? req.user.firstname + ' ' + req.user.lastname : '',
    mcq: mcquestion,
    mcqs: mcquestions
  });
});


module.exports = router;