const config = require('config');
const tokenHelper = require('../utils/tokenHelper');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

const facebookID = config.facebookTESTAppID;
const facebookSecret = config.facebookTESTSecret;
const twitterKey = config.twitterAPIKey;
const twitterSecret = config.twitterSecret;

module.exports = function(passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: facebookID,
        clientSecret: facebookSecret,
        callbackURL: '/api/passport-auth/auth/facebook/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        done(null, accessToken);
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
        done(null, accessToken);
      }
    )
  );

  passport.serializeUser((profile, done) => {
    console.log('SERIAL');
    done(null, profile);
  });

  // deserialize the cookieUserId to user in the database
  passport.deserializeUser((profile, done) => {
    console.log('DESERIAL');
    try {
      done(null, profile);
    } catch (err) {
      console.log('ERROR: ' + err);
      done(new Error('Failed to deserialize an user'));
    }
  });
};
