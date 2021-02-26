const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

const Subject = mongoose.model('subject', SubjectSchema);

module.exports = Subject;
