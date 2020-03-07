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

  images_Cleaned: {
    type: Number,
    required: false
  },

  text_Cleaned: {
    type: String,
    required: false
  }
});

module.exports = User = mongoose.model('user', UserSchema);
