const config = require('config');
const User = require('../models/User');
const FacebookStrategy = require('passport-facebook').Strategy;

let facebookID = config.facebookTESTAppID;
let facebookSecret = config.facebookTESTSecret;

// TODO: Find way to serialize user and the access token

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
          const newUser = await new User({
            facebook_id: profile.id,
            name: profile.displayName
          }).save();
          if (newUser) {
            done(null, newUser);
          }
        }
        done(null, currentUser);
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
  });

  // deserialize the cookieUserId to user in the database
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        console.log(user);
        done(null, user);
      })
      .catch(e => {
        console.log('error');
        done(new Error('Failed to deserialize an user'));
      });
  });
};
