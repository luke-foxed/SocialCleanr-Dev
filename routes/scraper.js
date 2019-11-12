const puppeteer = require('puppeteer');
const config = require('config');

const login = async () => {
  successfulLogin = false;
  try {
    var browser = await puppeteer.launch({ headless: false });
    var page = await browser.newPage();

    await page.goto('http://www.facebook.com/login');

    await page.focus('#email');
    await page.keyboard.type(config.facebookEmail);
    await page.focus('#pass');
    await page.keyboard.type(config.facebookPassword);

    await page.click('#loginbutton');
  } catch (e) {
    console.log('Error: ' + e);
  }
};

module.exports.login = login;
