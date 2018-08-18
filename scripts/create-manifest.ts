/**
 * Compress build/ folder to create archive which will be consumed by browser
 */
import { script } from './utils';
import { writeFileSync } from 'fs';
import { createChromeManifest } from '../packages/ManifestChrome';
import { createEdgeManifest } from '../packages/ManifestEdge';
import { createFirefoxManifest } from '../packages/ManifesFirefox';

if (process.env.BROWSER) {
  script(__filename, `Creating  manifest.json`, (_, exit) => {
    let manifest;
    switch(process.env.BROWSER) {
      case 'EDGE': {
        manifest = createEdgeManifest();
        break;
      }
      case 'FIREFOX': {
        manifest = createFirefoxManifest();
        break;
      }
      case 'CHROME': {
        manifest = createChromeManifest();
        break;
      }
      default: {
        throw new Error(`unknown BROWSER env '${process.env.BROWSER}'. Please use 'EDGE', 'FIREFOX' or 'CHROME'`);
      }
    }
    const manifestJSON = JSON.stringify(manifest, null, 2);
    writeFileSync('./build/manifest.json', manifestJSON);
    exit();
  });
} else {
  throw new Error('No browser selected, please add BROWSER env');
}

