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

module.exports = User = mongoose.model('FacebookUser', UserSchema);
