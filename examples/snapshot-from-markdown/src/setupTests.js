import {configure as configureSosia} from 'sosia';
import {PuppeteerBrowserTarget} from 'sosia-puppeteer';
import {MarkdownSource} from 'sosia-markdown';

configureSosia({
  targets: {
    'chrome-low-res': new PuppeteerBrowserTarget({
      width: 480,
      height: 500,
    }),
  },
  sources: {documentation: new MarkdownSource()},
});
