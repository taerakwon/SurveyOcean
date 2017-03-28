/*
  File name: multiplesurvey.js
  Group Number: Group 6
  Web App name: Survey Ocean
  Description: Model for multiple survey
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a model class
let SurveySchema = new Schema({  
    title: {
      type: String,
      default: '',
      trim: true,
      required: 'Title is required'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }, 
    counter: {
      type: Number,
      default: 0
    },
    questions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Types'
    },
    updated: {type:Date, default: Date.now},
    expire: {
      type:Date,
      expires: 60*60*24*7
    }
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Survey', SurveySchema);