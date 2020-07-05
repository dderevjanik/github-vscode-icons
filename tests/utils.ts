import fetch from 'node-fetch';

export const fetchDocument = async (url: string): Promise<HTMLElement> => {
  const response = await fetch(url);
  const pageSource = await response.text();
  const parser = new DOMParser();
  return parser.parseFromString(pageSource, 'text/html').documentElement;
};
