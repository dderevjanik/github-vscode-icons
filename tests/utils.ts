import { JSDOM } from 'jsdom';

import fetch from 'node-fetch';
import { table } from 'console';


export const SITE_RETRIEVE_TIMEOUT = 30000;

export const getElementFromSource = (elementSource: string): Document => {
  const dom = new JSDOM(elementSource);
  return dom.window.document;
  // const parser = new DOMParser();
  // return parser.parseFromString(elementSource, 'text/html').documentElement;
};

export const fetchDocument = async (url: string): Promise<Document> => {
  const response = await fetch(url);
  const pageSource = await response.text();
  return getElementFromSource(pageSource);
};

export const fetchRenderedDocument = async (url: string, waitSelector: string | null = 'table'): Promise<Document> => {
  await page.goto(url, { waitUntil: 'networkidle2' });
  if (waitSelector !== null) {
    await page.waitForSelector(waitSelector);
  }
  const renderedPageSource = await page.evaluate(() => {
    const nrOfFoundTables = document.querySelector('html').outerHTML;
    return nrOfFoundTables;
  });
  return getElementFromSource(renderedPageSource);
};
