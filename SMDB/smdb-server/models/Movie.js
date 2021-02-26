const mongoose = require('mongoose');

const MovieSchema = {
  title: {type: String, trim: true},
  year: String,
  genre: String,
  director: {type: mongoose.Schema.Types.ObjectId, ref: 'director'},
  actors: [{type: mongoose.Schema.Types.ObjectId, ref: 'actor'}],
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
};
const Movie = mongoose.model('movie', MovieSchema);

module.exports = Movie;