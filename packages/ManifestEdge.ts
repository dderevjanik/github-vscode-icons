/**
 * In order to make this extension works on Microsoft Edge, we need to edit chrome manifest
 */
import { createChromeManifest } from './ManifestChrome';

export const createEdgeManifest = () => {
  const manifest = createChromeManifest();
  /**
   * API Bridge polyfill
   * https://docs.microsoft.com/en-us/microsoft-edge/extensions/guides/porting-chrome-extensions
   */
  // @ts-ignore
  manifest['-ms-preload'] = {
    backgroundScript: 'backgroundScriptsAPIBridge.js',
    contentScript: 'contentScriptsAPIBridge.js'
  };
  return manifest;
};
