const config = require('config');
const tokenHelper = require('../utils/tokenHelper');
const jwt = require('jsonwebtoken');
const FacebookUser = require('../models/FacebookUser');
const TwitterUser = require('../models/TwitterUser');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

const facebookID = config.facebookTESTAppID;
const facebookSecret = config.facebookTESTSecret;

const twitterKey = config.twitterAPIKey;
const twitterSecret = config.twitterSecret;

let authMethod = '';

module.exports = function(passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: facebookID,
        clientSecret: facebookSecret,
        callbackURL: '/api/passport-auth/auth/facebook/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        authMethod = 'facebook';
        const currentUser = await FacebookUser.findOne({
          facebook_id: profile.id
        });

        if (!currentUser) {
          tokenHelper.extendToken(accessToken);
          const newUser = await new FacebookUser({
            facebook_id: profile.id,
            name: profile.displayName,
            token: accessToken,
            scans: 0,
            imagesCleaned: 0,
            textCleaned: 0
          }).save();

          if (newUser) {
            done(null, newUser);
          }
        } else {
          done(null, currentUser);
        }
      }
    )
  );

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: twitterKey,
        consumerSecret: twitterSecret,
        callbackURL: '/api/passport-auth/auth/twitter/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        authMethod = 'twitter';
        const currentUser = await TwitterUser.findOne({
          twitter_id: profile.id
        });

        if (!currentUser) {
          const newUser = await new TwitterUser({
            twitter_id: profile.id,
            name: profile.displayName,
            token: accessToken,
            scans: 0,
            imagesCleaned: 0,
            textCleaned: 0
          }).save();

          if (newUser) {
            done(null, newUser);
          }
        } else {
          done(null, currentUser);
        }
      }
    )
  );

  passport.serializeUser((profile, done) => {
    done(null, profile);
  });

  // deserialize the cookieUserId to user in the database
  passport.deserializeUser(async (profile, done) => {
    if (authMethod === 'facebook') {
      try {
        let facebookUser = await FacebookUser.findById(profile);

        const payload = {
          user: {
            id: facebookUser._id,
            social_id: facebookUser.facebook_id,
            token: facebookUser.token
          }
        };

        let authToken = jwt.sign(payload, 'test', { expiresIn: 36000 });

        done(null, authToken);
      } catch (err) {
        console.log('ERROR: ' + err);
        done(new Error('Failed to deserialize an user'));
      }
    } else {
      try {
        let twitterUser = await TwitterUser.findById(profile);

        const payload = {
          user: {
            id: twitterUser._id,
            social_id: twitterUser.twitter_id,
            token: twitterUser.token
          }
        };

        let authToken = jwt.sign(payload, 'test', { expiresIn: 36000 });

        done(null, authToken);
      } catch (err) {
        console.log('ERROR: ' + err);
        done(new Error('Failed to deserialize an user'));
      }
    }
  });
};
