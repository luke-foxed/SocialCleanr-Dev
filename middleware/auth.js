module.exports = function(req, res, next) {
  console.log(req.cookies);
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: 'user has not been authenticated'
    });
  } else {
    console.log('setting token: ' + req.user.token);
    res.cookie('token', req.user.token);
    next();
  }
};
