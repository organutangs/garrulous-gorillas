const mongoose = require('mongoose');

const ForSchema = mongoose.Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const For = module.exports = mongoose.model('For', ForSchema);