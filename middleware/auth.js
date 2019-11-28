// credit: https://github.com/bradtraversy/node_passport_login/blob/master/config/auth.js

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.user) {
      return next();
    }
    console.log('NOT AUTH');
    res.send('authentication error');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');
  }
};
