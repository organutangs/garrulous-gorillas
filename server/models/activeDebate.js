const mongoose = require('mongoose');

const ActiveDebateSchema = mongoose.Schema({
  topic: String,
  debate: { type: mongoose.Schema.Types.ObjectId, ref: 'Debate' },
  for: { type: mongoose.Schema.Types.ObjectId, ref: 'For' },
  against: { type: mongoose.Schema.Types.ObjectId, ref: 'Against' },
  spectator: { type: mongoose.Schema.Types.ObjectId, ref: 'Spectator' },
  debateArgs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DebateArg'}],
  pointsPro: { type: Number, default: 0},
  pointsCon: { type: Number, default: 0}
});

const ActiveDebate = module.exports = mongoose.model('ActiveDebate', ActiveDebateSchema);

module.exports.add = (debate, callback) => {
  debate.save(callback);
};

module.exports.addToArgumentToDebate = (debate, argument, callback) => {
  
};

module.exports.getAll = (callback) => {
  ActiveDebate.find(callback);
	// ActiveDebate.find().remove(callback); // run this to delete all debates off
};

// Add point to a particular debate (find by topic & side)
module.exports.addPoint = (topic, side, numOfPoints, callback) => {

  if (side === 'for') {

    ActiveDebate.findOneAndUpdate(
      { topic: topic },
      { $inc: {'pointsPro': numOfPoints} },
    callback);

  } else if (side === 'against') {

    ActiveDebate.findOneAndUpdate(
      { topic: topic },
      { $inc: {'pointsCon': numOfPoints} }, 
    callback);
    
  } else {
    console.log('error: wrong param');
  }

};

// Get number of votes for an argument
module.exports.getPointsByTopic = (topic, callback) => {
  ActiveDebate.findOne({topic: topic}, callback);
};





