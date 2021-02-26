const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account',
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'session',
    required: true,
  },
  noteType: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model('note', NoteSchema);

module.exports = Note;
