import { readJsonSync } from 'fs-extra';

export const createChromeManifest = () => {
  const manifest = readJsonSync('./packages/manifest.json');
  manifest.version = process.env.npm_package_version;
  if (process.env.NODE_ENV === 'development') {
    // FOR DEVELOPMENT;
    (manifest.browser_action as any)['default_popup'] = 'popup.html';
  }
  return manifest;
};
