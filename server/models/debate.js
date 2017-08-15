const mongoose = require('mongoose');

const DebateSchema = mongoose.Schema({
  updated: { type: Date, default: Date.now },
  topic: String,
  winner: String,
  pointsFor: Number,
  pointsAgainst: Number,
});

const Debate = module.exports = mongoose.model('Debate', DebateSchema);

module.exports.addDebate = (debate, callback) => {
  debate.save(callback);
};

module.exports.getDebateById = (id, callback) => {
  Debate.findById(id, callback);
};