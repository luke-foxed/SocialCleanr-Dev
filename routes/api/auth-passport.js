const express = require('express');
const router = express.Router();
const passport = require('passport');
const graph = require('fbgraph');
const { ensureAuthenticated } = require('../../middleware/auth');

const SUCCESS_REDIRECT = 'http://localhost:3000/dashboard';
const FAILURE_REDIRECT = 'http://localhost:3000/';

// AUTHENTICATION //

router.get('/login', passport.authenticate('facebook'));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
  })
);

router.get('/login/success', ensureAuthenticated, (req, res) => {
  res.json({
    success: true,
    message: 'user has successfully authenticated',
    user: req.user,
    cookies: req.cookies
  });
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.'
  });
});

////

// USER

router.get('/me', ensureAuthenticated, (req, res) => {
  graph.get(
    '/me?fields=id,name,email,posts{picture}',
    { access_token: req.user.token },
    function(err, data) {
      res.send(data);
    }
  );
});

module.exports = router;
