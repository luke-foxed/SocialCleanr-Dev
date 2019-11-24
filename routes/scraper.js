const puppeteer = require('puppeteer');
const config = require('config');
const fs = require('fs').promises;

let authenticated = false;
let cookies;

const loginFacebook = async (email, password, authCode) => {
  successfulLogin = false;
  try {
    var browser = await puppeteer.launch({ headless: false });
    var context = await browser.defaultBrowserContext();
    context.clearPermissionOverrides();
    await context.overridePermissions('https://www.facebook.com', [
      'notifications'
    ]);

    var page = await browser.newPage();

    await page.goto('https://www.facebook.com/login');

    await page.type('#email', email, { delay: 15 });
    await page.type('#pass', password, { delay: 15 });
    await page.click('#loginbutton');

    await page.waitForNavigation();
    await page.type('#approvals_code', authCode, { delay: 30 });

    await page.click('#checkpointSubmitButton');
    await page.waitForNavigation();

    await page.click('#checkpointSubmitButton');
    await page.waitForNavigation();

    await page.waitFor(5000);

    cookies = await JSON.stringify(page.cookies());
    console.log('COOKIES:\n' + cookies);

    // let header = await page.$(
    //   "//li[@id='navItem_100006292571516']/a[@class='_5afe' and 1]/div[@class='linkWrap noCount' and 1]"
    // );
    // return header.getProperty('textContent');
  } catch (e) {
    console.log('Error: ' + e);
  }
};

module.exports.loginFacebook = loginFacebook;
