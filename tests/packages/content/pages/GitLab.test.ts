import { fetchRenderedDocument } from '../../../utils';

import { QUERY_TREE_ITEMS } from '../../../../packages/content/pages/GitLab';

describe('Test Gitlab queries', () => {
  it('Repo root', async () => {
    const renderedDocument = await fetchRenderedDocument('https://gitlab.com/pycqa/flake8', '.tree-table');
    expect(renderedDocument.querySelectorAll(QUERY_TREE_ITEMS).length).not.toBe(0);
  });
  it('Subfolder with filetable', async () => {
    const renderedDocument = await fetchRenderedDocument(
      'https://gitlab.com/pycqa/flake8/-/tree/master/src/flake8',
      '.tree-table'
    );
    expect(renderedDocument.querySelectorAll(QUERY_TREE_ITEMS).length).not.toBe(0);
  });
  it('Open file', async () => {
    const renderedDocument = await fetchRenderedDocument(
      'https://gitlab.com/pycqa/flake8/-/blob/master/src/flake8/__init__.py',
      null
    );
    expect(renderedDocument.querySelectorAll(QUERY_TREE_ITEMS).length).toBe(0);
  });
});
