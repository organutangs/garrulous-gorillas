const mongoose = require('mongoose');

const DebateArgSchema = mongoose.Schema({
  updated: { type: Date, default: Date.now },
  body: String,
  votes: Number,
  debateTopic: String,
  debateSide: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  activeDebate: { type: mongoose.Schema.Types.ObjectId, ref: 'Debate' },
  voteDate: [{vote:Number, date:{ type: Date, default: Date.now }}]
});

const DebateArg = module.exports = mongoose.model('DebateArg', DebateArgSchema);

// Add an argument for a debate side
module.exports.addArgument = (newArg, callback) => {
	newArg.save(callback);
};

// Get arguments by side & debate topic
module.exports.getArgsByTopicAndSide = (topic, side, callback) => {
  DebateArg.find({debateTopic: topic, debateSide: side}, callback);
};

// Find the active debate by id and add to number of votes for a particular side
module.exports.addVoteForArgumentById = (id, numOfVotes, callback) => {
  DebateArg.findOneAndUpdate(
    { _id: id },
    { $inc: {'votes': numOfVotes} },
  callback);
};

// Find the active debate by argumentText and add to number of votes for a particular side
//also push a {vote:1, date:now} tupule for record keeping
module.exports.addVoteForArgumentByBody = (argument, numOfVotes, callback) => {
  DebateArg.findOneAndUpdate(
    { body: argument },
    { $push: { 'voteDate': {vote: 1} } ,
     $inc: {'votes': numOfVotes} },

  callback);
};

module.exports.getArgumentByBody = (argument, callback) => {
  DebateArg.findOne(
    { body: argument },
  callback);
};