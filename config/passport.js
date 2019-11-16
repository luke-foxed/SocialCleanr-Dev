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
        let user = {
          data: [],
          token: accessToken
        };

        const currentUser = await User.findOne({
          facebook_id: profile.id
        });

        if (!currentUser) {
          const newUser = await new User({
            facebook_id: profile.id,
            name: profile.displayName
          }).save();

          user.data = newUser;

          if (newUser) {
            done(null, user);
          }
        }
        user.data = currentUser;
        done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, {
      id: user.data.id,
      token: user.token
    });
  });

  // deserialize the cookieUserId to user in the database
  passport.deserializeUser((profile, done) => {
    User.findById(profile.id)
      .then(user => {
        var userToken = {
          user: user,
          token: profile.token
        };

        done(null, userToken);
      })
      .catch(e => {
        console.log('error');
        done(new Error('Failed to deserialize an user'));
      });
  });
};
