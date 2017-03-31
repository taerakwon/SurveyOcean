/*
  File name: users.js
  Group Number: Group 6
  Web App name: Survey Ocean
  Description: Model for users
*/


let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new Schema({
  username: {
    type: String,
    default: '',
    trim: true,
    required: 'Username is required'
  },
  email: {
    type: String,
    default: '',
    trim: true,
    required: 'E-mail is required'
  },
  firstname: {
    type: String,
    default: '',
    trim: true,
    required: 'First name is required'
  },
  lastname: {
    type: String,
    default: '',
    trim: true,
    required: 'Last name is required'
  },
  created: {type: Date, default: Date.now
  },
  updated: {type: Date, default: Date.now}
},{
  collection: "users"
});

let options = ({missingPasswordError: "Wrong Password"});
UserSchema.plugin(passportLocalMongoose, options);
exports.User = mongoose.model('User', UserSchema);