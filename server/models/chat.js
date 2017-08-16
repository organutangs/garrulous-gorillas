const mongoose = require('mongoose');

const ChatLogSchema = mongoose.Schema({
  updated: { type: Date, default: Date.now },
  body: String,
  debateSide: String,
  votes: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  activeDebate: { type: Schema.Types.ObjectId, ref: 'Debate' }
});

const ChatLog = module.exports = mongoose.model('ChatLog', ChatLogSchema);

module.exports.addChat = (chat, callback) => {
  chat.save(callback);
};