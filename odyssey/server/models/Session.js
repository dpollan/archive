const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  method: {
    type: Number,
    required: true,
  },
  strength: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'note',
  },
  opportunity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'note',
  },
  comprehensionRating: {
    type: Number,
  },
  satisfactionRating: {
    type: Number,
  },
  successRating: {
    type: Number,
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'note',
    },
  ],
});

const Session = mongoose.model('session', SessionSchema);

module.exports = Session;
