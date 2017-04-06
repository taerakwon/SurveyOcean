/*
  File name: multiplesurvey.js
  Group Number: Group 6
  Web App name: Survey Ocean
  Description: Model for multiple survey
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// True and false type schema
let tfqSchema = new Schema({
  question: {
    type: String,
    required: 'You need to enter a question',
    trim: true
  },
  true: {
    type: Number,
    default: 0
  },
  false: {
    type: Number,
    default: 0
  }
});

// Multiple choice schema
let mcqSchema = new Schema({
  question: {
    type: String,
    required: 'You need to enter a question',
    trim: true
  },
  options: [optionSchema]
})

// Option schema
let optionSchema = new Schema({
  option: {
    type: String,
    default: '',
    trim: true
  },
  counter: {
    type: Number,
    default: 0
  }
})

// create a model class for tfq
let tfqSurveySchema = new Schema({
  questions: [tfqSchema],
  surveyType: {
    type: String,
    default: 'tfq'
  },
  createdBy: mongoose.Schema.Types.ObjectId,
  created: {type:Date, default: Date.now},
  expire:{type:Date}
  },
  {
    collection: "surveys"
  }
);

let mcqSurveySchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Please enter title'
  },
  questions: [mcqSchema],
  surveyType: {
    type: String,
    default: 'mcq'
  },
  createdBy: mongoose.Schema.Types.ObjectId,
  created: {type:Date, default: Date.now},
  expire:{type:Date}
  },
  {
    collection: "surveys"
  }
);

// Export the module
module.exports = mongoose.model('Survey', SurveySchema);