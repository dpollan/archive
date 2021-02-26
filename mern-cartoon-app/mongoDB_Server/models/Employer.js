const mongoose = require('mongoose');

const EmployerSchema = {
  title: String,
  description: String,
  show: {type: mongoose.Schema.Types.ObjectId, ref: 'show'}
};

const Employer = mongoose.model('employer', EmployerSchema);

module.exports = Employer;