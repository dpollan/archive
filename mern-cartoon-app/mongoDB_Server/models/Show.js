const mongoose = require('mongoose');

const ShowSchema = {
  title: String,
  image: String
};

const Show = mongoose.model('show', ShowSchema);

module.exports = Show;
