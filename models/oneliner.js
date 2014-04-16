var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var onelineSchema = new Schema({
  title: String,
  situation: String,
  verified: { type: Boolean, default: false },
  updated: { type: Date, default: Date.now } 
});

onelineSchema.statics.random = function(cb) {
  this.count({verified: true}, function(err, count) {
    if (err) return cb(err);
    var rand = Math.floor(Math.random() * count);
    this.findOne({verified: true}).skip(rand).exec(cb);
  }.bind(this));
};


module.exports.OneLine = mongoose.model('OneLine', onelineSchema);