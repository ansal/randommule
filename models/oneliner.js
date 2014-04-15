var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var onelineSchema = new Schema({
  title: String,
  situation: String,
  submittedBy: String,
  verified: Boolean,
  updated: { type: Date, default: Date.now } 
});

module.exports.OneLine = mongoose.model('OneLine', onelineSchema);