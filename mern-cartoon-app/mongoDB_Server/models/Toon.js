const mongoose = require('mongoose');

const ToonSchema = {
  first: String,
  last: String,
  sex: Boolean,
  image: String,
  quotes: [String],
  show: {type: mongoose.Schema.Types.ObjectId, ref: 'show'},
  employer: {type: mongoose.Schema.Types.ObjectId, ref: 'employer'},
  rating: Number
};

const Toon = mongoose.model('toon', ToonSchema);

module.exports = Toon;
