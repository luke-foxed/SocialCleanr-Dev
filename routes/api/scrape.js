const scraper = require('../scraper');
const express = require('express');
const router = express.Router();

/**
@route   GET api/scrape
@desc    Test to scrape Facebook
@access  Public
*/

router.get('/', async (req, res) => {
  scraper.login().then(data => {
    console.log(data);
  });
});

module.exports = router;
