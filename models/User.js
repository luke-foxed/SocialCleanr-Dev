const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  facebook_id: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  token: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('User', UserSchema);
