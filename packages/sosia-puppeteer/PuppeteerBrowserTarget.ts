import Datauri from 'datauri';
import puppeteer, {Browser} from 'puppeteer';

interface Viewport {
  height: number;
  width: number;
}

const numParallel = 4;

const capture = (browser: Browser, viewport: Viewport) => async (uri: string): Promise<string> => {
  const page = await browser.newPage();

  await page.setViewport(viewport);
  await page.goto(uri);

  return await page.screenshot({
    type: 'png',
    clip: {
      x: 0,
      y: 0,
      ...viewport,
    },
    encoding: 'base64',
    omitBackground: true,
  });
};

const toDataUri = (page: Sosia.Page): string => {
  const html = `
    <!DOCTYPE html>
    <head>
    <meta charset="utf-8">
    <style>
      ${page.css}
    </style>
    </head>
    ${page.body}
  `;
  const htmlBuffer = Buffer.from(html, 'utf8');
  const datauri = new Datauri();
  datauri.format('.html', htmlBuffer);
  return datauri.content;
};

export default class PupeteerBrowserTarget {
  viewport: Viewport;
  constructor({height, width}: Viewport) {
    this.viewport = {height, width};
  }

  async execute(pages: Sosia.Page[]): Promise<string[]> {
    const numOfPages = pages.length;
    const screenshots = [] as string[];

    for (let i = 0; i < numOfPages; i += numParallel) {
      const browser = await puppeteer.launch();
      const uris = pages.map(toDataUri);
      const batch = uris.slice(i, i + numParallel);
      const promises = batch.map(capture(browser, this.viewport));
      const screenshotsInBatch = await Promise.all(promises);
      screenshots.push(...screenshotsInBatch);
      await browser.close();
    }

    return screenshots;
  }
}
