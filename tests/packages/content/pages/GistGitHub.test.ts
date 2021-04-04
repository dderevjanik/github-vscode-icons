import { fetchDocument,SITE_RETRIEVE_TIMEOUT } from '../../../utils';

import { QUERY_FILE_INFO } from '../../../../packages/content/pages/GistGitHub';

it('Test GistGitHub query', async (done) => {
  const fetchedDocument = await fetchDocument('https://gist.github.com/spences10/5c492e197e95158809a83650ff97fc3a');
  expect(fetchedDocument.querySelectorAll(QUERY_FILE_INFO).length).not.toBe(0);
  done();
}, SITE_RETRIEVE_TIMEOUT);
