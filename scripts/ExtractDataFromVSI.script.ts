/**
 * This script will extract data from vscode-icons, those data will be later used to
 * Create Icons Data, which will be used in runtime as dictionary where `key` is name of folder
 * we want icon for and `value` is icon's filename.
 */
import * as Path from 'path';
import fetch from 'node-fetch';
import { bgYellow, green } from 'chalk';
import { writeFileSync } from 'fs';

const log = console.log;
const filename = Path.basename(__filename);
const LANG_URL = 'https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/src/icon-manifest/languages.ts';

const reKey = /(.*?):/;
const reIds = /ids:.*'(.*?)'/;
const reExt = /defaultExtension:.*'(.*?)'/;

(async function() {
  log(bgYellow(`(${filename}) Downloading vscode languages`));

  fetch(LANG_URL, {})
    .then(res => res.text())
    .then(body => {
      const bodyLines = body.split('\n').slice(3, -2);
      const languages: any = {};
      const keyIdExt = bodyLines.map((fLine: string) => {
        const line = fLine.trim();
        const key = reKey.exec(line);
        // const ids = reIds.exec(line);
        const ext = reIds.exec(line);

        languages[key[1]] = {
          defaultExtension: ext[1]
        };
      });
      const languagesJSON = JSON.stringify(languages, null, 2);
      writeFileSync('../languages.json', languagesJSON);
      log(green(`> './languages.json' file created`));
    });
})();
