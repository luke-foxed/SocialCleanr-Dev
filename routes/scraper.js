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

    cookies = await page.cookies();
    console.log('COOKIES:\n');
    console.log(cookies);

    // need to checl if user is actually logged in

    if (cookies != null) {
      browser.close();
      return 'logged in, cookies saved';
    }
  } catch (e) {
    console.log('Error: ' + e);
  }
};

const testNavigation = async () => {
  console.log('COOKIES NOW:\n');
  console.log(cookies);

  if (cookies != null) {
    var browser = await puppeteer.launch({ headless: false });
    var context = await browser.defaultBrowserContext();
    context.clearPermissionOverrides();
    await context.overridePermissions('https://www.facebook.com', [
      'notifications'
    ]);

    var page = await browser.newPage();
    await page.setCookie(...cookies);

    await page.goto('https://www.facebook.com/me/photos_all');

    return 'success';
  } else {
    return 'no cookies';
  }
};

module.exports = {
  loginFacebook,
  testNavigation
};
