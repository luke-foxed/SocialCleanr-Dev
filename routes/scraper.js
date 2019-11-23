const puppeteer = require('puppeteer');
const config = require('config');

const authenticated = false;

const loginFacebook = async (email, password, authCode) => {
  successfulLogin = false;
  try {
    var browser = await puppeteer.launch({ headless: false });
    var page = await browser.newPage();

    await page.goto('http://www.facebook.com/login');

    await page.type('#email', email, { delay: 15 });
    await page.type('#pass', password, { delay: 15 });
    await page.click('#loginbutton', { delay: 30 });

    await page.waitForNavigation();
    await page.type('#approvals_code', authCode);

    await page.click('#checkpointSubmitButton', { delay: 30 });
    await page.click('#checkpointSubmitButton');

    let header = await page.$(
      "//li[@id='navItem_100006292571516']/a[@class='_5afe' and 1]/div[@class='linkWrap noCount' and 1]"
    );
    return header.getProperty('textContent');
  } catch (e) {
    console.log('Error: ' + e);
  }
};

module.exports.loginFacebook = loginFacebook;
