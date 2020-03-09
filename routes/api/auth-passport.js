const express = require('express');
const router = express.Router();
const passport = require('passport');
const graph = require('fbgraph');
const TwitterLite = require('twitter-lite');
const config = require('config');
const AES = require('crypto-js/aes');
const cryptoEnc = require('crypto-js/enc-utf8');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const SUCCESS_REDIRECT = 'http://localhost:3000/dashboard';
const FAILURE_REDIRECT = 'http://localhost:3000/login';

// delete after
let tokenSecret = '';

var twitterConfig = {
  consumer_key: config.get('twitterAPIKey'),
  consumer_secret: config.get('twitterAPISecret'),
  access_token: config.get('twitterAccessToken'),
  access_token_secret: config.get('twitterAccessTokenSecret')
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
    const token = req.user.accessToken;
    const facebookID = req.user.profileID;
    const userID = req.cookies['userID'];
    const encryptedToken = AES.encrypt(
      token,
      config.get('cryptoPassphrase')
    ).toString();

    // let decrypted = AES.decrypt(encryptedToken, config.get('cryptoPassphrase')).toString(cryptoEnc);

    // delete cookie after value is assigned
    delete req.cookies['userID'], req.user;

    try {
      await User.findOneAndUpdate(
        { _id: userID },
        {
          $set: {
            is_connected_facebook: true,
            facebook_token: encryptedToken,
            facebook_id: facebookID
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
    const token = req.user.token;
    tokenSecret = req.user.tokenSecret;
    const twitterID = req.user.profileID;
    const userID = req.cookies['userID'];
    const encryptedToken = await AES.encrypt(
      token,
      config.get('cryptoPassphrase')
    ).toString();

    // let decrypted = AES.decrypt(encryptedToken, config.get('cryptoPassphrase')).toString(cryptoEnc);

    // delete cookie after value is assigned
    delete req.cookies['userID'], req.user;

    try {
      await User.findOneAndUpdate(
        { _id: userID },
        {
          $set: {
            is_connected_twitter: true,
            twitter_token: encryptedToken,
            twitter_id: twitterID
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
  const decryptedToken = AES.decrypt(
    user.facebook_token,
    config.get('cryptoPassphrase')
  ).toString(cryptoEnc);

  graph.get(
    '/me?fields=posts{picture,message}',
    { access_token: decryptedToken },
    function(err, data) {
      console.log(data);
      res.send(data);
    }
  );
});

router.get('/my-twitter', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const decryptedToken = AES.decrypt(
    user.twitter_token,
    config.get('cryptoPassphrase')
  ).toString(cryptoEnc);
  const twitterID = decryptedToken.split('-')[0];
  twitterConfig.access_token = decryptedToken;
  twitterConfig.access_token_secret = tokenSecret;
  const twitterClient = new TwitterLite(twitterConfig);
  const options = {
    id: twitterID
  };
  try {
    twitterClient
      .get('account/verify_credentials')
      .then(results => {
        console.log('results', results);
      })
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
