/**
 * Script will create json data, which contains dictionaries for runtime,
 * where `key` is name of folder
 * we want icon for and `value` is icon's filename.
 */
import * as Path from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { bgYellow, green } from 'chalk';

const log = console.log;
const filename = Path.basename(__filename);
const iconsJSONFile = readFileSync('./icons.json');
const languagesJSONFile = readFileSync('./languages.json');
const PATH_ICONSDATA = './src/iconsData';

type IconKey = string;

const icons = JSON.parse(iconsJSONFile.toString()) as {
    iconDefinitions: { [iconKey: string]: { iconPath: string } },
    folderNames: { [folderName: string]: IconKey },
    fileExtensions: { [fileExtension: string]: IconKey },
    fileNames: { [fileName: string]: IconKey },
    languageIds: { [language: string]: IconKey }
    light: {
        folderNames: { [folderName: string]: IconKey },
        fileExtensions: { [fileExtension: string]: IconKey },
        fileNames: { [fileName: string]: IconKey },
        languageIds: { [language: string]: IconKey }
    }
};

const langauges = JSON.parse(languagesJSONFile.toString()) as {
    [language: string]: {
        ids: string | string[];
        defaultExtension: string;
    }
};

const writeFile = (path: string, callback: () => any) => {
    const result = callback();
    writeFileSync(
        path,
        JSON.stringify(result, null, 2)
    );
    log(green(`> '${path}' file created`));
}

// create mini-json files

(async function () {
    log(bgYellow(`(${filename}) Creating mini-json files from definitions`));

    // Icons to Path
    writeFile(`${PATH_ICONSDATA}/IconsToPath.json`, () => {
        const iconsDefinition = Object.keys(icons.iconDefinitions).reduce((acc, icon) => ({
            ...acc,
            [icon]: icons.iconDefinitions[icon].iconPath.split('/').pop()
        }), {});
        return iconsDefinition;
    });

    // FolderNames to Icon
    writeFile(`${PATH_ICONSDATA}/FolderNamesToIcon.json`, () => {
        const folderNames = Object.keys(icons.light.folderNames).reduce((acc, folderName) => ({
            ...acc,
            [folderName]: icons.light.folderNames[folderName]
        }), {});
        return folderNames;
    });


    // FileExtensions to Icon
    writeFile(`${PATH_ICONSDATA}/FileExtensionsToIcon.json`, () => {
        const fileExtensions = Object.keys(icons.light.fileExtensions).reduce((acc, fileExtension) => ({
            ...acc,
            [fileExtension]: icons.light.fileExtensions[fileExtension]
        }), {});
        return fileExtensions;
    });

    // FileNames to Icon
    writeFile(`${PATH_ICONSDATA}/FileNamesToIcon.json`, () => {
        const fileNames = Object.keys(icons.light.fileNames).reduce((acc, fileName) => ({
            ...acc,
            [fileName]: icons.light.fileNames[fileName]
        }), {});
        return fileNames;
    });

    // Languages to Icon
    writeFile(`${PATH_ICONSDATA}/LanguagesToIcon.json`, () => {
        const languagesIds = Object.keys(langauges).reduce((acc, languageId) => {
            const languageDef = langauges[languageId];
            const languageExtension = languageDef.defaultExtension;
            const iconFileName = icons.languageIds[languageId];

            // sometimes, icon for language not exists, so skip it
            if (iconFileName === undefined) {
                return {
                    ...acc
                };
            }

            // light theme version should be
            const withoutPrefix = iconFileName.slice(3); // remove prefix "_f_"
            const lightIconFileName = `_f_light_${withoutPrefix}`;
            const existsLightTheme = icons.iconDefinitions[lightIconFileName]; // try to find light theme of icon

            const langaugeIcon = {
                [languageDef.defaultExtension]: existsLightTheme
                    ? lightIconFileName
                    : iconFileName
            };
            return {
                ...acc,
                ...langaugeIcon
            };
        }, {});
        return languagesIds;
    });

})();
