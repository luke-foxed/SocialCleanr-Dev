const express = require('express');
const router = express.Router();
const passport = require('passport');
const graph = require('fbgraph');
const twitter = require('twitter');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const SUCCESS_REDIRECT = 'http://localhost:3000/dashboard';
const FAILURE_REDIRECT = 'http://localhost:3000/login';

var client = {
  consumer_key: config.twitterAPIKey,
  consumer_secret: config.twitterSecret,
  bearer_token: ''
};

// AUTHENTICATION //

router.get('/login-facebook/:id', function(req, res, next) {
  // log user ID to cookie to be used in callback
  res.cookie('userID', req.params.id);
  passport.authenticate('facebook')(req, res, next);
});

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    session: false
  }),
  async (req, res) => {
    // get API token and userID to write to DB
    const token = req.user;
    const userID = req.cookies['userID'];

    // delete cookie after value is assigned
    delete req.cookies['userID'], req.user;

    try {
      await User.findOneAndUpdate(
        { _id: userID },
        { $set: { is_connected_facebook: true, facebook_token: token } },
        { new: true }
      );
      res.redirect(SUCCESS_REDIRECT);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/login-twitter/:id', function(req, res, next) {
  // log user ID to cookie to be used in callback
  res.cookie('userID', req.params.id);
  passport.authenticate('twitter')(req, res, next);
});

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    session: false
  }),
  async (req, res) => {
    // get API token and userID to write to DB
    const token = req.user;
    const userID = req.cookies['userID'];

    // delete cookie after value is assigned
    delete req.cookies['userID'], req.user;

    try {
      await User.findOneAndUpdate(
        { _id: userID },
        { $set: { is_connected_twitter: true, twitter_token: token } },
        { new: true }
      );
      res.redirect(SUCCESS_REDIRECT);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.post('/remove-site', auth, async (req, res) => {
  let site = req.body.site;
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { [`is_connected_${site}`]: false, [`${site}_token`]: '' } }
    );
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
