const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  flagged_content: {
    type: Array,
    required: false,
    default: [],
  },

  is_connected_facebook: {
    type: Boolean,
    required: false,
    default: false,
  },

  is_connected_twitter: {
    type: Boolean,
    required: false,
    default: false,
  },

  facebook_token: {
    type: String,
    required: false,
  },

  twitter_token: {
    type: String,
    required: false,
  },

  twitter_token_secret: {
    type: String,
    required: false,
  },

  total_images: {
    type: Number,
    required: false,
  },

  total_posts: {
    type: Number,
    required: false,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
