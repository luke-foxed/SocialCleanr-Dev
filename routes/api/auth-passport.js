const express = require('express');
const router = express.Router();
const passport = require('passport');
const graph = require('fbgraph');
const twitter = require('twitter');
const config = require('config');
const auth = require('../../middleware/auth');
const FacebookUser = require('../../models/FacebookUser');
const TwitterUser = require('../../models/TwitterUser');

const SUCCESS_REDIRECT_FACEBOOK = 'http://localhost:3000/auth?facebook';
const SUCCESS_REDIRECT_TWITTER = 'http://localhost:3000/auth?twitter';
const FAILURE_REDIRECT = 'http://localhost:3000/login';

var client = {
  consumer_key: config.twitterAPIKey,
  consumer_secret: config.twitterSecret,
  bearer_token: ''
};

// AUTHENTICATION //

router.get('/login-facebook', passport.authenticate('facebook'));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: SUCCESS_REDIRECT_FACEBOOK,
    failureRedirect: FAILURE_REDIRECT
  })
);

router.get('/get-token', (req, res) => {
  try {
    let token = req.user;
    res.send(token);
  } catch (err) {
    console.error(err.message);
    res
      .status(401)
      .json({ errors: [{ msg: 'No authentication token found' }] });
  }
});

router.get('/login-twitter', passport.authenticate('twitter'));

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: SUCCESS_REDIRECT_TWITTER,
    failureRedirect: FAILURE_REDIRECT
  })
);

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.'
  });
});

// USERS

router.post('/get-user', auth, async (req, res) => {
  try {
    let user = '';
    if (req.body.website === 'facebook#_=_') {
      user = await FacebookUser.findById(req.authUser.id).select('-token');
    } else {
      user = await TwitterUser.findById(req.authUser.id).select('-token');
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/my-facebook', auth, (req, res) => {
  console.log(req.user.token);
  graph.get(
    '/me?fields=posts{picture}',
    { access_token: req.user.token },
    function(err, data) {
      console.log(data);
      res.send(data);
    }
  );
});

router.get('/my-twitter', auth, (req, res) => {
  client.bearer_token = req.authUser.token;
  const twitterClient = new twitter(client);
  const options = {
    user_id: req.authUser.twitter_id
  };
  twitterClient.get('users/lookup', options, (err, res) => {
    res.send(res);
  });
});

module.exports = router;
