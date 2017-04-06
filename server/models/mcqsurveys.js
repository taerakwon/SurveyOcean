/*
  File name: multiplesurvey.js
  Group Number: Group 6
  Web App name: Survey Ocean
  Description: Model for multiple survey
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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

// Multiple choice schema
let mcqSchema = new Schema({
  question: {
    type: String,
    required: 'You need to enter a question',
    trim: true
  },
  options: [optionSchema]
})


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
module.exports = mongoose.model('MCQSurvey', mcqSurveySchema);