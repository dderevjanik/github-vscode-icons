/**
 * Script will create json data, which contains dictionaries for runtime,
 * where `key` is name of folder we want icon for and `value` is icon's filename.
 */
import { script } from './utils';
import { writeFileSync, readFileSync } from 'fs';
import Ch from 'chalk';
const iconsJSONFile = readFileSync('./icons.json');
const vsiLanguagesFile = readFileSync('./languages-vsi.json');
const vscodeLanguagesFile = readFileSync('./languages-vscode.json');
const PATH_ICONSDATA = './packages/content/data';
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

const languages = JSON.parse(vsiLanguagesFile.toString()) as {
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
    console.log(Ch.green(`> '${path}' file created`));
}

// create mini-json files

script(__filename, 'Creating mini-json files from definitions', ({ log }, exit) => {
    const iconToPath: any = Object.keys(icons.iconDefinitions).reduce((acc, icon) => ({
        ...acc,
        [icon]: icons.iconDefinitions[icon].iconPath.split('/').pop()
    }), {});

    // FolderNames to Icon
    writeFile(`${PATH_ICONSDATA}/FolderNamesToIcon.json`, () => {
        const folderNames = Object.keys(icons.light.folderNames).reduce((acc, folderName) => ({
            ...acc,
            [folderName]: iconToPath[
                icons.light.folderNames[folderName]
            ]
        }), {});
        return folderNames;
    });


    // FileExtensions to Icon
    writeFile(`${PATH_ICONSDATA}/FileExtensions1ToIcon.json`, () => {
        // 1 - .js, .ts, .cpp
        const fileExtensions1 = Object.keys(icons.light.fileExtensions).reduce((acc, fileExtension) => {
            if (fileExtension.indexOf('.') === -1) {
                return {
                    ...acc,
                    [fileExtension]: iconToPath[
                        icons.light.fileExtensions[fileExtension]
                    ]
                };
            }
            return { ...acc };
        }, {});
        return fileExtensions1;
    });
    writeFile(`${PATH_ICONSDATA}/FileExtensions2ToIcon.json`, () => {
        // 2. - .js.map, .test.js, .test.json
        const fileExtensions2 = Object.keys(icons.light.fileExtensions).reduce((acc, fileExtension) => {
            if (fileExtension.indexOf('.') > -1) {
                return {
                    ...acc,
                    [fileExtension]: iconToPath[
                        icons.light.fileExtensions[fileExtension]
                    ]
                };
            }
            return { ...acc };
        }, {});
        return fileExtensions2;
    });

    // FileNames to Icon
    writeFile(`${PATH_ICONSDATA}/FileNamesToIcon.json`, () => {
        const fileNames = Object.keys(icons.light.fileNames).reduce((acc, fileName) => ({
            ...acc,
            [fileName]: iconToPath[
                icons.light.fileNames[fileName]
            ]
        }), {});
        return fileNames;
    });

    // Languages to Icon
    const vscodeLanguages = JSON.parse(vscodeLanguagesFile.toString()) as {
        [languageId: string]: {
            extensions: [string]
        }
    };
    writeFile(`${PATH_ICONSDATA}/LanguagesToIcon.json`, () => {
        const languagesIds = Object.keys(languages).reduce((acc, languageId) => {
            const language = languages[languageId];
            const defaultExtension = language.defaultExtension;
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
            const iconPath = existsLightTheme
                ? iconToPath[lightIconFileName]
                : iconToPath[iconFileName];

            // Are there any language extensions supported by vscode ?
            if (vscodeLanguages[languageId]) {
                const supportedExtensions = vscodeLanguages[languageId].extensions;
                const languageExtensions: { [ext: string]: string } = {};
                supportedExtensions.forEach((extension) => {
                    // slice(1) - remove dot (e.g. ".cpp" to "cpp")
                    languageExtensions[extension.slice(1)] = iconPath;
                });
                // Override default extension
                languageExtensions[language.defaultExtension] = iconPath;
                return {
                    ...acc,
                    ...languageExtensions
                }
            } else {
                return {
                    ...acc,
                    [language.defaultExtension]: iconPath
                };
            }

        }, {});
        return languagesIds;
    });
    exit();
});
