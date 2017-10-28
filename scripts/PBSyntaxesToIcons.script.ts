/**
 * This script will try to find languages, extensions and filenames icons
 * for pastebin syntaxes.
 */
import * as Path from 'path';
import { bgYellow, green } from 'chalk';
import { writeFileSync, readFileSync } from 'fs';

type NAME_TO_ICON = { [name: string]: string };

const log = console.log;
const filename = Path.basename(__filename);
const DEFAULT_FILE = 'default_file.svg';

log(bgYellow(`(${filename}) Parsing Pastebin syntaxes`));

const langaugesToExt = JSON.parse(readFileSync('./languages.json').toString());
const extToIcons = JSON.parse(readFileSync('./src/data/LanguagesToIcon.json').toString());
const pastebinSyntaxes = JSON.parse(readFileSync('./PasteBinSyntaxes.json').toString());

const pastebinSyntaxesToIcon = Object.keys(pastebinSyntaxes).reduce((acc, syntax) => {
    const languageName = pastebinSyntaxes[syntax];
    if (languageName.length === 0) {
        return { ...acc };
    }
    const languageExt = langaugesToExt[languageName].defaultExtension
    const iconPath = extToIcons[languageExt]
        ? extToIcons[languageExt]
        : DEFAULT_FILE;
    return {
        ...acc,
        [syntax]: iconPath
    };
}, {});

writeFileSync('./src/data/PBSyntaxToIcon.json', JSON.stringify(pastebinSyntaxesToIcon, null, 2))
log(green('> ./scr/data/PBSyntaxToIcon created'));
