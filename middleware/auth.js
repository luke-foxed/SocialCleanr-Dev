const jwt = require('jsonwebtoken');

// credit: https://github.com/bradtraversy/node_passport_login/blob/master/config/auth.js

// module.exports = {
//   ensureAuthenticated: function(req, res, next) {
//     if (req.user) {
//       return next();
//     }
//     console.log('NOT AUTH');
//     res.send('authentication error');
//   },
//   forwardAuthenticated: function(req, res, next) {
//     if (!req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect('/dashboard');
//   }
// };

module.exports = async function(req, res, next) {
  const authToken = req.header('x-auth-token');

  if (!authToken) {
    return res.status(401).json({ msg: 'No token, auth denied' });
  }

  try {
    let decoded = jwt.verify(authToken, 'test');
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Error: ' + err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
