import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const LANG_URL = 'https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/src/icon-manifest/languages.ts';

fetch(LANG_URL)
    .then((res) => res.text())
    .then((body) => {
        const lines = body.split('\n').slice(3, -2).join('\n');
        const json = '{' + lines + '}';
        console.log(JSON.parse(json));
    });
