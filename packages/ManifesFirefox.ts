import { createChromeManifest } from './ManifestChrome';

export const createFirefoxManifest = () => {
  const manifest = createChromeManifest();
  delete manifest['offline_enabled'];
  delete manifest['background']['persistent'];
  return manifest;
};
