import { fetchRenderedDocument,SITE_RETRIEVE_TIMEOUT } from '../../../utils';


import { QUERY_FILE_TABLE_ROWS, QUERY_ICONS_TO_REPLACE } from '../../../../packages/content/pages/BitBucket';

describe('Test Bitbucket queries', () => {
  it('Repo root', async () => {
    const renderedDocument = await fetchRenderedDocument('https://bitbucket.org/pypa/distlib/src/master/');
    expect(renderedDocument.querySelectorAll(QUERY_FILE_TABLE_ROWS).length).not.toBe(0);
    expect(renderedDocument.querySelectorAll(QUERY_ICONS_TO_REPLACE).length).not.toBe(0);
  },SITE_RETRIEVE_TIMEOUT);
  it('Subfolder with filetable', async () => {
    const renderedDocument = await fetchRenderedDocument('https://bitbucket.org/pypa/distlib/src/master/tests/');
    expect(renderedDocument.querySelectorAll(QUERY_FILE_TABLE_ROWS).length).not.toBe(0);
    expect(renderedDocument.querySelectorAll(QUERY_ICONS_TO_REPLACE).length).not.toBe(0);
  },SITE_RETRIEVE_TIMEOUT);
  it('Open file', async () => {
    const renderedDocument = await fetchRenderedDocument(
      'https://bitbucket.org/pypa/distlib/src/master/README.rst',
      null
    );
    expect(renderedDocument.querySelectorAll(QUERY_FILE_TABLE_ROWS).length).toBe(0);
    expect(renderedDocument.querySelectorAll(QUERY_ICONS_TO_REPLACE).length).toBe(0);
  },SITE_RETRIEVE_TIMEOUT);
});
