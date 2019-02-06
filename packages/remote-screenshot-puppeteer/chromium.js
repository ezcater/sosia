const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getScreenshot({url, type, viewport}) {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });

  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(url, {waitUntil: 'load'});
  const file = await page.screenshot({type, omitBackground: true});
  await browser.close();
  return file;
}

module.exports = {getScreenshot};
