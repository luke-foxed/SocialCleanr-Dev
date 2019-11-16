const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCheck = require('../../middleware/auth');

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
  //   function(req, res) {
  //     let token = req.user;
  //     console.log('\nTOKEN\n');
  //     console.log(token);
  //     res.send('success');
  //   }
);

router.get('/login/success', authCheck, (req, res) => {
  if (req.user) {
    res.cookie('token', req.user.token);
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
