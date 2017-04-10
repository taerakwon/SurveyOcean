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

// create a model class for tfq
let tfqSurveySchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Please enter title'
  },
  questions: [tfqSchema],
  surveyType: {
    type: String,
    default: 'tfq'
  },
  createdBy: Schema.ObjectId,
  created: {type:Date, default: Date.now},
  expire:{type:Date}
  },
  {
    collection: "tfsurveys"
  }
);

// Option schema for multiple choice
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
    collection: "mcsurveys"
  }
);

let MC = mongoose.model('MC', optionSchema);
let MCQ = mongoose.model('MCQ', mcqSchema);
let TFQ = mongoose.model('TFQ', tfqSchema);
let MCQS = mongoose.model('MCQS', mcqSurveySchema);
let TFQS = mongoose.model('TFQS', tfqSurveySchema);

// Export the module
module.exports = {
  MC: MC,
  MCQ: MCQ,
  TFQ: TFQ,
  MCQS: MCQS,
  TFQS: TFQS
}