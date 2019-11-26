const scraper = require('../scraper');
const express = require('express');
const router = express.Router();
const config = require('config');

/**
@route   GET api/scrape
@desc    Test to scrape Facebook
@access  Public
*/

router.post('/', async (req, res) => {
  // let { email, password, authCode } = req.body;
  // scraper.login(email, password, authCode).then(data => {
  //   console.log(data);
  // });

  const login = await scraper.loginFacebook(
    config.facebookEmail,
    config.facebookPassword,
    req.body.authCode
  );
  res.send(login);
});

router.get('/scrape', async (req, res) => {
  const scrape = await scraper.scrapePhotos();
  res.send(scrape);
});

module.exports = router;
