const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res) {
    res.cookie('auth', req.user.token);
    res.send('success');
  }
);

module.exports = router;
