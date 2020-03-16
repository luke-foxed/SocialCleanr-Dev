// const scraper = require('../scraper');
const express = require('express');
const router = express.Router();
// const config = require('config');

/**
@route   GET api/scrape
@desc    Test to scrape Facebook
@access  Public
*/

router.post('/login', async (req, res) => {
  // let { email, password, authcode } = req.body;
  // const login = await scraper.loginFacebook(email, password, authcode);
  // res.send(login);
  // const login = await scraper.loginFacebook(
  //   config.facebookEmail,
  //   config.facebookPassword,
  //   req.body.authCode
  // );
});

router.get('/scrape', async (req, res) => {
  // const scrape = await scraper.scrapePhotos();
  // res.send(scrape);
});

module.exports = router;
