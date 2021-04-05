import { createChromeManifest } from './ManifestChrome';

export const createFirefoxManifest = () => {
  const manifest = createChromeManifest();
  delete manifest['offline_enabled'];
  delete manifest['background']['persistent'];
  const fireFoxSpecifficSettings = {
    browser_specific_settings: {
      gecko: {
        id: '{dd10a870-27c8-4b74-bfd4-0f767fe68770}',
        strict_min_version: '67.0'
      }
    }
  };
  return { ...manifest, ...fireFoxSpecifficSettings };
};
