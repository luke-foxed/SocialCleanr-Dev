const config = require('config');
const tokenHelper = require('../utils/tokenHelper');
const User = require('../models/User');
const FacebookStrategy = require('passport-facebook').Strategy;

let facebookID = config.facebookTESTAppID;
let facebookSecret = config.facebookTESTSecret;

module.exports = function(passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: facebookID,
        clientSecret: facebookSecret,
        callbackURL: '/api/passport-auth/auth/facebook/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const currentUser = await User.findOne({
          facebook_id: profile.id
        });

        if (!currentUser) {
          tokenHelper.extendToken(accessToken);
          const newUser = await new User({
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

  passport.serializeUser((profile, done) => {
    done(null, profile.id);
  });

  // deserialize the cookieUserId to user in the database
  passport.deserializeUser((id, done) => {
    User.findById(id)
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
  });
};
