//@ts-check
import { copyFile } from 'fs/promises';
import { modifyJsonFile } from 'modify-json-file';
import { readPackageJsonFile } from 'typed-jsonfile';

await copyFile('./packages/manifest.json', './build/manifest.json');
await modifyJsonFile('./build/manifest.json', {
  version: (await readPackageJsonFile({ dir: '.' })).version,
});
