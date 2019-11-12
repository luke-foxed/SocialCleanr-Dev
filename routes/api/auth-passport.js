const express = require('express');
const router = express.Router();
const passport = require('passport');

const CLIENT_HOMEPAGE = 'http://localhost:3000/dashboard';

// router.get('/', passport.authenticate('facebook'));

// router.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     res
//       .cookie('token', req.user.token, {
//         expires: new Date(Date.now() + 9999999),
//         secure: true,
//         httpOnly: true
//       })
//       .send('success');
//   }
// );

router.get('/', passport.authenticate('facebook'));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: CLIENT_HOMEPAGE,
    failureRedirect: '/auth/login/failed'
  })
);

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.'
  });
});

module.exports = router;
