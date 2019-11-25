const puppeteer = require('puppeteer');
const config = require('config');
const fs = require('fs').promises;

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

    cookies = await page.cookies();
    console.log('\nCOOKIES:\n');
    console.log(cookies);

    // need to check if user is actually logged in

    if (cookies != null) {
      browser.close();
      return 'logged in, cookies saved';
    }
  } catch (e) {
    return 'Error: ' + e;
  }
};

const scrapePhotos = async () => {
  if (cookies != null) {
    const images = [];

    try {
      var browser = await puppeteer.launch({ headless: false });

      // remove notification window
      var context = await browser.defaultBrowserContext();
      context.clearPermissionOverrides();
      await context.overridePermissions('https://www.facebook.com', [
        'notifications'
      ]);

      var page = await browser.newPage();
      await page.setCookie(...tempCookie);

      await page.goto('https://www.facebook.com/me/photos_all');
      await page.waitForSelector('a.uiMediaThumbMedium');

      // get total images
      let totalImages = await page.$$('a.uiMediaThumbMedium');

      // click first thumbnail
      await page.$$eval('a.uiMediaThumbMedium', thumbnails =>
        $(thumbnails[0]).click()
      );

      await page.waitForNavigation();

      // method 1
      page.on('response', response => {
        if (response.url().includes('t1.0-9')) images.push(response.url());
      });

      // // method 2
      // const imageURL = await page.$eval('.spotlight', image => {
      //   return image.getAttribute('src');
      // });

      // // method 3
      // const text = await page.evaluate(() =>
      //   document.querySelector('.spotlight').getAttribute('src')
      // );

      for (let i = 0; i < totalImages.length - 1; i++) {
        await page.click(
          '.fbPhotoSnowliftContainer > .clearfix > .stageWrapper > .snowliftPager:nth-child(7) > i'
        );
        page.on('response', response => {
          if (response.url().includes('t1.0-9')) images.push(response.url());
        });
      }

      browser.close();

      return images;
    } catch (e) {
      return 'Error ' + e;
    }
  } else {
    return 'User is not logged in';
  }
};

module.exports = {
  loginFacebook,
  scrapePhotos
};
