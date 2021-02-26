const mongoose = require('mongoose');

const DirectorSchema = {
  name: {type: String, trim: true},
  films: [{type: mongoose.Schema.Types.ObjectId, ref:'movie'}],
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
};
const Director = mongoose.model('director', DirectorSchema);

module.exports = Director;