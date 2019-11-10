const config = require('config');
const cookie = require('cookie-parser');
const FacebookStrategy = require('passport-facebook').Strategy;

let facebookID = config.facebookTESTAppID;
let facebookSecret = config.facebookTESTSecret;

module.exports = function(passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: facebookID,
        clientSecret: facebookSecret,
        callbackURL: '/auth/facebook/callback'
      },
      function(accessToken, refreshToken, profile, done) {
        var user = {
          id: profile.id,
          token: accessToken
        };
        return done(null, user);
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
