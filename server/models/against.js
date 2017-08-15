const mongoose = require('mongoose');

const AgainstSchema = mongoose.Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Against = module.exports = mongoose.model('Against', AgainstSchema);