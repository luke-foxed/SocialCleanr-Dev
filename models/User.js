const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  scans: {
    type: Number,
    required: false
  },

  images_cleaned: {
    type: Number,
    required: false
  },

  text_cleaned: {
    type: String,
    required: false
  },

  is_connected_facebook: {
    type: Boolean,
    required: false,
    default: false
  },

  is_connected_twitter: {
    type: Boolean,
    required: false,
    default: false
  },

  facebook_token: {
    type: String,
    required: false
  },

  twitter_token: {
    type: String,
    required: false
  }
});

module.exports = User = mongoose.model('user', UserSchema);
