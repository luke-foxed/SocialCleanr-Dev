const config = require('config');
const tokenHelper = require('../utils/tokenHelper');
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
        console.log(profile);
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
    done(null, profile.id);
  });

  // deserialize the cookieUserId to user in the database
  passport.deserializeUser((id, done) => {
    if (authMethod === 'facebook') {
      FacebookUser.findById(id)
        .then(user => {
          if (!tokenHelper.validateToken(user)) {
            done(new Error('Token no longer valid'));
          } else {
            done(null, user);
          }
        })
        .catch(e => {
          console.log('ERROR: ' + e);
          done(new Error('Failed to deserialize an user'));
        });
    } else {
      TwitterUser.findById(id)
        .then(user => {
          done(null, user);
        })
        .catch(e => {
          console.log('ERROR: ' + e);
          done(new Error('Failed to deserialize an user'));
        });
    }
  });
};
