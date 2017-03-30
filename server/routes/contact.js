/*
  File name: contact.js
  Group Number: Group 6
  Web App name: Survey Ocean
  Description: Responsible for routing contact page
*/

let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('content/contact', { 
    page: 'contact',
    title: 'Survey Ocean' 
  });
});

module.exports = router;
