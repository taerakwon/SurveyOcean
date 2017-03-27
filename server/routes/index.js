let express = require('express');
let router = express.Router();

// Firebase
let firebase = require('firebase');
let firebaseConfig = require('../config/firebase');

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Survey Ocean' });
});

// Initialize the Firebase SDK
firebase.initializeApp(firebaseConfig)

module.exports = router;
