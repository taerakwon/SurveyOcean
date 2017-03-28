/*
  File name: surveyTypes.js
  Group Number: Group 6
  Web App name: Survey Ocean
  Description: Model for different survey types
*/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let surveyTypesSchema = new Schema({
    multipleQuestion: [{
      text: String, counter: {
          type: Number,
          default: 0
      }
    }],
    adQuestion: [{
        agree: [{
            text: String, counter: {
                type: Number,
                default: 0
            }
        }],
        diagree: [{
            text: String, counter:{
                type: Number,
                default: 0
            }
        }]
    }]
},{
  collection: "surveytypes"
});

exports.User = mongoose.model('Type', surveyTypesSchema);