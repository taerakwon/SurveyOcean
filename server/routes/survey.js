/*
  File name: SURVEY.js
  Group Number: Group 6
  Web App name: Survey Ocean
  Description: Responsible for routing survey page
*/
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('surveys/index', { 
    page: 'survey',
    title: 'Survey - Survey Ocean' 
  });
});

module.exports = router;
