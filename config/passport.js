const config = require('config');
const tokenHelper = require('../utils/tokenHelper');
const FacebookUser = require('../models/FacebookUser');
const TwitterUser = require('../models/TwitterUser');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');

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
          social_media_id: profile.id
        });

        const payload = {
          user: {
            social_media_id: profile.id
          }
        };

        let authToken = jwt.sign(payload, 'test', { expiresIn: 36000 });

        let user = {
          jwt: authToken,
          api: accessToken
        };

        if (!currentUser) {
          tokenHelper.extendToken(accessToken);
          const facebookUser = await new FacebookUser({
            social_media_id: profile.id,
            name: profile.displayName,
            token: accessToken,
            scans: 0,
            imagesCleaned: 0,
            textCleaned: 0
          }).save();
        }

        done(null, user);
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
            social_media_id: profile.id,
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
    new JWTStrategy(
      {
        jwtFromRequest: req => req.cookies.jwt,
        secretOrKey: 'test'
      },
      (jwtPayload, done) => {
        if (Date.now() > jwtPayload.expires) {
          return done('jwt expired');
        }

        return done(null, jwtPayload);
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
