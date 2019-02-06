import Datauri from 'datauri';
import fetch from 'node-fetch';
import {Page} from 'sosia-types';

interface Options {
  url: URL;
  height: number;
  width: number;
}

const numParallel = 4;

const capture = (options: Options) => async (uri: string): Promise<string> => {
  const url = new URL(options.url.toString());
  url.pathname = uri;
  url.searchParams.set('height', options.height.toString());
  url.searchParams.set('width', options.width.toString());

  const response = await fetch(url.toString());
  const buffer = await response.buffer();
  return buffer.toString('base64');
};

const toDataUri = (page: Page): string => {
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
  options: Options;
  constructor(options: Options) {
    this.options = options;
  }

  async execute(pages: Page[]): Promise<string[]> {
    const numOfPages = pages.length;
    const screenshots = [] as string[];

    for (let i = 0; i < numOfPages; i += numParallel) {
      const uris = pages.map(toDataUri);
      const batch = uris.slice(i, i + numParallel);
      const promises = batch.map(capture(this.options));
      const screenshotsInBatch = await Promise.all(promises);
      screenshots.push(...screenshotsInBatch);
    }

    return screenshots;
  }
}
