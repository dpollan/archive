const mongoose = require('mongoose');

const ActorSchema = {
  name: {type: String, trim: true},
  films: [{type: mongoose.Schema.Types.ObjectId, ref:'movie'}],
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
};
const Actor = mongoose.model('actor', ActorSchema);

module.exports = Actor;