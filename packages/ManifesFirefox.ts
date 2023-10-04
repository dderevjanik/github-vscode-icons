import { createChromeManifest } from './ManifestChrome';

export const createFirefoxManifest = () => {
  const manifest = createChromeManifest();
  delete manifest['offline_enabled'];
  delete manifest['background']['persistent'];
  manifest['background'].scripts = [manifest.background.service_worker];
  manifest.background.page = 'background.html';
  delete manifest.background.service_worker;
  return manifest;
};
