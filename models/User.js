const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  is_gamification_enabled: {
    type: Boolean,
    required: false,
    default: false,
  },

  statistics: [
    {
      custom_scans: {
        type: Number,
        required: false,
      },

      automated_scans: {
        type: Number,
        required: false,
      },

      images_cleaned: {
        type: Number,
        required: false,
      },

      flagged_text: {
        type: Number,
        required: false,
      },

      flagged_age: {
        type: Number,
        required: false,
      },

      flagged_clothing: {
        type: Number,
        required: false,
      },

      flagged_gesture: {
        type: Number,
        required: false,
      },
    },
  ],

});

module.exports = User = mongoose.model('user', UserSchema);
