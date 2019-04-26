/**
 * This template is used to generate 'build/manifest.json' by `npm run manifest`
 * In order to test some features only in 'dev' environment
 */
const manifest = {
  manifest_version: 2,
  name: 'github-vscode-icons',
  description: 'This extension shows a VS Code icons in Github Repositories',
  icons: {
    '128': 'icon128.png',
    '48': 'icon48.png',
    '16': 'icon16.png'
  },
  version: '1.18',
  author: 'Daniel Derevjanik <daniel.derevjanik@gmail.com>',
  offline_enabled: true,
  browser_action: {
    default_icon: {
      '128': 'icon128.png',
      '48': 'icon48.png'
    }
  },
  background: {
    scripts: ['background.js'],
    persistent: false
  },
  web_accessible_resources: ['icons/*.svg', 'images/*.gif'],
  content_scripts: [
    {
      css: ['content.css'],
      matches: ['*://*/*'],
      js: ['content.js'],
      run_at: 'document_end'
    }
  ],
  permissions: [
    'storage',
    '*://bitbucket.org/*',
    '*://github.com/*',
    '*://gist.github.com/*',
    '*://gitlab.com/*',
    '*://pastebin.com/*',
    '*://sourceforge.net/*'
  ]
};

export const createChromeManifest = () => {
  if (process.env.NODE_ENV === 'development') {
    // FOR DEVELOPMENT;
    (manifest.browser_action as any)['default_popup'] = 'popup.html';
  }
  return manifest;
};
