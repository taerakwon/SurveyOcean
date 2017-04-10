/*
  File name: about.js
  Group Number: Group 6
  Web App name: Survey Ocean
  Description: Responsible for routing about page
*/
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{ 
  res.render('content/about', { 
    page: 'about',
    title: 'Survey Ocean' 
  });
});

module.exports = router;
