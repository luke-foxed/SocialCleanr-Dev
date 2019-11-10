const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  facebook_id: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('AuthFacebook', UserSchema);
