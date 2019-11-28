const express = require('express');
const graph = require('fbgraph');
const router = express.Router();
const config = require('config');

const facebookID = config.get('facebookTESTAppID');
const facebookSecret = config.get('facebookTESTSecret');

var options = {
  timeout: 3000,
  pool: { maxSockets: Infinity },
  headers: { connection: 'keep-alive' }
};

var scope = 'email, user_posts';

var token = '';

/**
@route   GET api/auth
@desc    Test to authenticate using Facebook
@access  Public
*/

router.get('/', async (req, res) => {
  if (!req.query.code) {
    console.log('Performing oauth for some user right now.');

    var authUrl = graph.getOauthUrl({
      client_id: facebookID,
      redirect_uri: 'http://localhost:5000/facebook-auth',
      scope: 'email, user_posts'
    });

    if (!req.query.error) {
      console.log('getting oauth url');
      res.redirect(authUrl);
    } else {
      console.log('Access denied');
      //req.query.error == 'access_denied'
      res.send('access denied');
    }
  }
  // If this branch executes user is already being redirected back with
  // code (whatever that is)
  else {
    console.log('Oauth successful, the code is: ', req.query.code + '\n');

    // code is set
    // we'll send that and get the access token
    graph.authorize(
      {
        client_id: facebookID,
        redirect_uri: 'http://localhost:5000/facebook-auth',
        client_secret: facebookSecret,
        code: req.query.code
      },
      function(err, facebookRes) {
        token = facebookRes.access_token;
        res.redirect('/');
      }
    );
  }

  router.get('/get', async (req, res) => {
    graph
      .setOptions(options)
      .get(
        '/me?fields=id,name,email,birthday,posts.limit(5)',
        { access_token: token },
        function(err, data) {
          res.send(data); // { id: '4', name: 'Mark Zuckerberg'... }
        }
      );
  });
});

module.exports = router;
