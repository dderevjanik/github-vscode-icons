/**
 * Compress build/ folder to create archive which will be consumed by browser
 */
import { script } from './utils';
import { writeFileSync } from 'fs';
import { createChromeManifest } from '../packages/ManifestChrome';

script(__filename, `Creating  manifest.json`, ({ log, Ch }, exit) => {
  const manifest = createChromeManifest();
  const manifestJSON = JSON.stringify(manifest, null, 2);
  writeFileSync('./build/manifest.json', manifestJSON);
  exit();
});
