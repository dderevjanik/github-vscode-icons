import { fetchRenderedDocument, SITE_RETRIEVE_TIMEOUT} from '../../../utils';

import { QUERY_TREE_ITEMS } from '../../../../packages/content/pages/GitLab';

describe('Test Gitlab queries', () => {
  it('Repo root', async (done) => {
    const renderedDocument = await fetchRenderedDocument('https://gitlab.com/pycqa/flake8', '.tree-table');
    expect(renderedDocument.querySelectorAll(QUERY_TREE_ITEMS).length).not.toBe(0);
    done();
  }, SITE_RETRIEVE_TIMEOUT);
  it('Subfolder with filetable', async (done) => {
    const renderedDocument = await fetchRenderedDocument(
      'https://gitlab.com/pycqa/flake8/-/tree/master/src/flake8',
      '.tree-table'
    );
    expect(renderedDocument.querySelectorAll(QUERY_TREE_ITEMS).length).not.toBe(0);
    done();
  }, SITE_RETRIEVE_TIMEOUT);
  it('Open file', async (done) => {
    const renderedDocument = await fetchRenderedDocument(
      'https://gitlab.com/pycqa/flake8/-/blob/master/src/flake8/__init__.py',
      null
    );
    expect(renderedDocument.querySelectorAll(QUERY_TREE_ITEMS).length).toBe(0);
    done();
  }, SITE_RETRIEVE_TIMEOUT);
});
