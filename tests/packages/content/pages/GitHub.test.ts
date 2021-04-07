/**
 * @jest-environment jsdom
 */

import { fetchDocument, SITE_RETRIEVE_TIMEOUT } from '../../../utils';

import {
  QUERY_FILE_TABLE_ITEMS,
  QUERY_PATH_SEGMENTS,
  QUERY_PJAX_CONTAINER,
  QUERY_LAST_PATH_SEGMENT
} from '../../../../packages/content/pages/GitHub';

describe('Test Github queries', () => {
  it('Repo root', async () => {
    const fetchedDocument = await fetchDocument('https://github.com/dderevjanik/github-vscode-icons');
    expect(fetchedDocument.querySelectorAll(QUERY_FILE_TABLE_ITEMS).length).not.toBe(0);
    expect(fetchedDocument.querySelectorAll(QUERY_PATH_SEGMENTS).length).toBe(0);
    expect(fetchedDocument.querySelectorAll(QUERY_PJAX_CONTAINER).length).not.toBe(0);
    expect(fetchedDocument.querySelectorAll(QUERY_LAST_PATH_SEGMENT).length).toBe(0);
  }, SITE_RETRIEVE_TIMEOUT);
  it('Subfolder with filetable', async () => {
    const fetchedDocument = await fetchDocument(
      'https://github.com/dderevjanik/github-vscode-icons/tree/master/packages/content/pages'
    );
    expect(fetchedDocument.querySelectorAll(QUERY_FILE_TABLE_ITEMS).length).not.toBe(0);
    expect(fetchedDocument.querySelectorAll(QUERY_PATH_SEGMENTS).length).not.toBe(0);
    expect(fetchedDocument.querySelectorAll(QUERY_PJAX_CONTAINER).length).not.toBe(0);
    expect(fetchedDocument.querySelectorAll(QUERY_LAST_PATH_SEGMENT).length).not.toBe(0);
  }, SITE_RETRIEVE_TIMEOUT);
  it('Open file', async () => {
    const fetchedDocument = await fetchDocument(
      'https://github.com/dderevjanik/github-vscode-icons/blob/master/packages/content/pages/GitHub.ts'
    );
    expect(fetchedDocument.querySelectorAll(QUERY_FILE_TABLE_ITEMS).length).toBe(0);
    expect(fetchedDocument.querySelectorAll(QUERY_PATH_SEGMENTS).length).not.toBe(0);
    expect(fetchedDocument.querySelectorAll(QUERY_PJAX_CONTAINER).length).not.toBe(0);
    expect(fetchedDocument.querySelectorAll(QUERY_LAST_PATH_SEGMENT).length).not.toBe(0);
  }, SITE_RETRIEVE_TIMEOUT);
});
