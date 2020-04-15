const express = require('express');
const router = express.Router();
const passport = require('passport');
const graph = require('fbgraph');
const TwitterLite = require('twitter-lite');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const generalHelpers = require('../../helpers/generalHelpers');
const parseHelpers = require('../../helpers/parseHelpers');

const SUCCESS_REDIRECT = 'http://localhost:3000/dashboard';

var twitterConfig = {
  consumer_key: config.get('twitterAPIKey'),
  consumer_secret: config.get('twitterAPISecret'),
  access_token_key: '',
  access_token_secret: '',
};

/**
 * @route    GET api/auth-passport/login-facebook/:id
 * @desc     Connect to user's Facebook account
 * @access   Private
 */

router.get('/login-facebook/:id', function (req, res, next) {
  // create temp cookie to store user ID
  res.cookie('userID', req.params.id, {
    maxAge: 20000,
    httpOnly: true,
  });
  passport.authenticate('facebook')(req, res, next);
});

/**
 * @route    GET api/auth-passport/auth/facebook/callback
 * @desc     Facebook callback, exposes access token which is written to DB
 * @access   Private
 */

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    session: true,
  }),
  async (req, res) => {
    // get API token and userID to write to DB
    const token = req.user;
    const userID = req.cookies['userID'];
    const encryptedToken = generalHelpers.encryptAES(token);

    // delete cookie after value is assigned
    delete req.cookies['userID'], req.user;

    try {
      await User.findOneAndUpdate(
        { _id: userID },
        {
          $set: {
            is_connected_facebook: true,
            facebook_token: encryptedToken,
          },
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

/**
 * @route    GET api/auth-passport/login-twitter/:id
 * @desc     Connect to user's Twitter account
 * @access   Private
 */

router.get('/login-twitter/:id', function (req, res, next) {
  // log user ID to cookie to be used in callback
  res.cookie('userID', req.params.id, {
    maxAge: 20000,
    httpOnly: true,
  });
  passport.authenticate('twitter')(req, res, next);
});

/**
 * @route    GET api/auth-passport/auth/twitter/callback
 * @desc     Twitter callback, exposes access token & secret token which is written to DB
 * @access   Private
 */

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    session: false,
  }),
  async (req, res) => {
    // get API token and userID to write to DB
    const { token, tokenSecret } = req.user;
    const userID = req.cookies['userID'];
    const encryptedToken = generalHelpers.encryptAES(token);
    const encryptedTokenSecret = generalHelpers.encryptAES(tokenSecret);

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
            twitter_token_secret: encryptedTokenSecret,
          },
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

/**
 * @route    PUT api/auth-passport/remove-site
 * @desc     Remove user's connection to specified site, clearing DB values
 * @access   Private
 */

router.put('/remove-site', auth, async (req, res) => {
  let site = req.body.site;
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          [`is_connected_${site}`]: false,
          [`${site}_token`]: '',
          [`${site}_token_secret`]: '',
        },
      }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route    GET api/auth-passport/my-facebook
 * @desc     Returns user's Facebook posts and photos
 * @access   Private
 */

router.get('/my-facebook', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const decryptedToken = await generalHelpers.decrpytAES(user.facebook_token);

  try {
    await graph.get(
      '/me?fields=posts{full_picture,message},photos{images}',
      {
        access_token: decryptedToken,
      },
      async (err, data) => {
        if (err) res.status(500).send(err);
        else {
          let parsedResults = parseHelpers.parseFacebookResults(data);

          await User.findByIdAndUpdate(req.user.id, {
            $set: {
              total_images: parsedResults.photos.length,
              total_posts: parsedResults.text.length,
            },
          });

          res.send(parsedResults);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/**
 * @route    GET api/auth-passport/my-twitter
 * @desc     Returns user's Twitter posts and photos
 * @access   Private
 */

router.get('/my-twitter', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const decryptedToken = await generalHelpers.decrpytAES(user.twitter_token);
    const decryptedTokenSecret = await generalHelpers.decrpytAES(
      user.twitter_token_secret
    );

    twitterConfig.access_token_key = decryptedToken;
    twitterConfig.access_token_secret = decryptedTokenSecret;

    const twitterClient = new TwitterLite(twitterConfig);

    const options = {
      // user_id: 155659213,
      user_id: decryptedToken.split('-')[0],
      count: 100,
      trim_user: false,
    };

    let data = await twitterClient.get('statuses/user_timeline', options);
    let parsedResults = parseHelpers.parseTwitterResults(data);

    await User.findByIdAndUpdate(req.user.id, {
      $set: {
        total_images: parsedResults.photos.length,
        total_posts: parsedResults.text.length,
      },
    });

    res.send(parsedResults);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.errors[0].message);
  }
});

module.exports = router;
