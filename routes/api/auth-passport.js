const express = require('express');
const router = express.Router();
const passport = require('passport');
const graph = require('fbgraph');
const twitter = require('twitter');
const config = require('config');
const { ensureAuthenticated } = require('../../middleware/auth');

const SUCCESS_REDIRECT_FACEBOOK = 'http://localhost:3000/dashboard?facebook';
const SUCCESS_REDIRECT_TWITTER = 'http://localhost:3000/dashboard?twitter';
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

// USER

router.get('/my-facebook', ensureAuthenticated, (req, res) => {
  graph.get(
    '/me?fields=id,name,email,posts{picture}',
    { access_token: req.user.token },
    function(err, data) {
      res.send(data);
    }
  );
});

router.get('/my-twitter', ensureAuthenticated, (req, res) => {
  client.bearer_token = req.user.token;
  const twitterClient = new twitter(client);
  const options = {
    user_id: req.user.id
  };
  twitterClient.get('users/lookup', options, (err, res) => {
    console.log(res);
  });
});

module.exports = router;
