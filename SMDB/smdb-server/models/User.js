const mongoose = require('mongoose');

const UserSchema = {
  username: {type: String, trim: true},
  email: {type: String, trim: true}
};
const User = mongoose.model('user', UserSchema);

module.exports = User;