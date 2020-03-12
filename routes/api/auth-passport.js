const express = require('express');
const router = express.Router();
const passport = require('passport');
const graph = require('fbgraph');
const TwitterLite = require('twitter-lite');
const config = require('config');
const AES = require('crypto-js/aes');
const enctf8 = require('crypto-js/enc-utf8');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const generalHelper = require('../../helpers/generalHelpers');

const SUCCESS_REDIRECT = 'http://localhost:3000/dashboard';
const FAILURE_REDIRECT = 'http://localhost:3000/login';

// NEED TO MOVE ENCRYPTION DECRYPTION TO HELPER FILE

var twitterConfig = {
  consumer_key: config.get('twitterAPIKey'),
  consumer_secret: config.get('twitterAPISecret'),
  access_token_key: '',
  access_token_secret: ''
};

// AUTHENTICATION //

router.get('/login-facebook/:id', function(req, res, next) {
  // create temp cookie to store user ID
  res.cookie('userID', req.params.id, {
    maxAge: 20000,
    httpOnly: true
  });
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
    const encryptedToken = generalHelper.encryptAES(token);

    // delete cookie after value is assigned
    delete req.cookies['userID'], req.user;

    try {
      await User.findOneAndUpdate(
        { _id: userID },
        {
          $set: {
            is_connected_facebook: true,
            facebook_token: encryptedToken
          }
        },
        { new: true }
      );
      res.redirect(SUCCESS_REDIRECT);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

router.get('/login-twitter/:id', function(req, res, next) {
  // log user ID to cookie to be used in callback
  res.cookie('userID', req.params.id, {
    maxAge: 20000,
    httpOnly: true
  });
  passport.authenticate('twitter')(req, res, next);
});

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    session: false
  }),
  async (req, res) => {
    // get API token and userID to write to DB
    const { token, tokenSecret } = req.user;
    const userID = req.cookies['userID'];
    const encryptedToken = generalHelper.encryptAES(token);
    const encryptedTokenSecret = generalHelper.encryptAES(tokenSecret);

    // delete cookie after value is assigned
    delete req.cookies['userID'], req.user;

    secret = tokenSecret;
    try {
      await User.findOneAndUpdate(
        { _id: userID },
        {
          $set: {
            is_connected_twitter: true,
            twitter_token: encryptedToken,
            twitter_token_secret: encryptedTokenSecret
          }
        },
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

router.get('/my-facebook', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const decryptedToken = await generalHelper.decrpytAES(user.facebook_token);

  try {
    await graph.get(
      '/me?fields=posts{full_picture,message},photos{images}',
      {
        access_token: decryptedToken
      },
      function(err, data) {
        if (err) res.status(500).send(err);
        else {
          res.send(data);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/my-twitter', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const decryptedToken = await generalHelper.decrpytAES(user.twitter_token);
    const decryptedTokenSecret = await generalHelper.decrpytAES(
      user.twitter_token_secret
    );

    twitterConfig.access_token_key = decryptedToken;
    twitterConfig.access_token_secret = decryptedTokenSecret;

    const twitterClient = new TwitterLite(twitterConfig);

    const options = {
      user_id: 155659213, // --> RONALDO
      // user_id: decryptedToken.split('-')[0]
      count: 10,
      trim_user: false
    };

    let data = await twitterClient.get('statuses/user_timeline', options);
    res.send(data);
  } catch (err) {
    console.log(err.errors);
    res.status(500).send(err.errors[0].message);
  }
});

module.exports = router;
