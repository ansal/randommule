var OneLine = require('../models/oneliner').OneLine;
var Questions = require('../questions').questions;

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max-min+1) + min);;
}

exports.index = function(req, res){
  OneLine.random(function(err, quote){
    res.render('index', {quote: quote});
  });
};

exports.question = function(req, res) {
  var qid = getRandomNumber(0, Questions.length - 1);
  var question = Questions[qid];
  delete(question.answer)
  res.json(question);
};

exports.oneLiner = function(req, res) {
  OneLine.random(function(err, quote){
    res.json(quote);
  });
};

exports.newOneliner = function(req, res) {
  var qid = req.body.qid;
  var answer = req.body.answer;
  var title = req.body.oneliner;
  var situation = req.body.situation;
  var name = req.body.name;
  console.log(qid, answer, oneliner)
  if(typeof qid === 'undefined' || 
    typeof answer === 'undefined' ||
    typeof situation === 'undefined' ||
    typeof title === 'undefined') {
    res.json(403, {error: 'Please enter all required fields'});
    return;
  }
  title = title.toLowerCase();
  qid = parseInt(qid, 10);
  // check whether answer is correct or not
  console.log(Questions[qid - 1].answer, answer);
  if(Questions[qid - 1].answer !== answer) {
    res.json({error: 'Incorrect Answer!!! Looks like you are not from Jaaga Study'});
    return;
  }
  var oneliner = new OneLine({
    title: title,
    situation: situation,
    submittedBy: name,
    verified: true
  });
  oneliner.save(function(err, obj){
    if(err) {
      console.log(err);
      res.json(500, {error: 'Your request could not be processed. Please try again.'});
      return;
    }
    res.json(obj);
  });
};