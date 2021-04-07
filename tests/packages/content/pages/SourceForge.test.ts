import { fetchDocument, SITE_RETRIEVE_TIMEOUT } from '../../../utils';

import { QUERY_SOURCEFORGE_ITEMS } from '../../../../packages/content/pages/SourceForge';

describe('Test SourceForge queries', () => {
  it('Repo root', async () => {
    const fetchedDocument = await fetchDocument('https://sourceforge.net/projects/python-fire.mirror/files/');
    expect(fetchedDocument.querySelectorAll(QUERY_SOURCEFORGE_ITEMS).length).not.toBe(0);
  }, SITE_RETRIEVE_TIMEOUT);
  it('Subfolder with filetable', async () => {
    const fetchedDocument = await fetchDocument('https://sourceforge.net/projects/python-fire.mirror/files/v0.3.1/');
    expect(fetchedDocument.querySelectorAll(QUERY_SOURCEFORGE_ITEMS).length).not.toBe(0);
  }, SITE_RETRIEVE_TIMEOUT);
});
