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
    question: "Hey, I guess it's working",
    true: 0,
    false: 0
  });

  let tfqs = new SurveyModel.TFQS({
    title: "What do you think about Centennial?",
    questions: [tfq],
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

/* ADD NEW SURVEY - MCQ */
router.post('/mcq',(req,res,next) => {
  let newQuestion = question({
    "inputQuestion1": req.body.inputQuestion1
  });
});

module.exports = router;