const express = require('express');
const graph = require('fbgraph');
const router = express.Router();
const authCheck = require('../../middleware/auth');

let tempToken = '';

router.get('/me', async (req, res) => {
  let profile = '';
  graph.get(
    '/me?fields=id,name,email,posts{picture}',
    // { access_token: req.cookies['token'] },
    { access_token: tempToken },
    function(err, data) {
      res.send(data);
    }
  );
});

module.exports = router;
