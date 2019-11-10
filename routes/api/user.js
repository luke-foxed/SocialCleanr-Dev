const express = require('express');
const graph = require('fbgraph');
const router = express.Router();

router.get('/', async (req, res) => {
  // does not work console.log(req.cookies);
  graph.get(
    '/me?fields=id,name,email,birthday,posts.limit(5)',
    { access_token: req.cookies['auth'] },
    function(err, res) {
      console.log(res);
    }
  );
});

module.exports = router;
