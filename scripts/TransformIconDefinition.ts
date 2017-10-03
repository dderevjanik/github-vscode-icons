import { writeFileSync, readFileSync } from 'fs';

const iconsJSONFile = readFileSync('../icons.json');
const languagesJSONFile = readFileSync('../languages.json');

type IconKey = string;

const icons = JSON.parse(iconsJSONFile.toString()) as {
    iconDefinitions: { [iconKey: string]: { iconPath: string } },
    folderNames: { [folderName: string]: IconKey },
    fileExtensions: { [fileExtension: string]: IconKey },
    fileNames: { [fileName: string]: IconKey },
    languageIds: { [language: string]: IconKey }
};

const langauges = JSON.parse(languagesJSONFile.toString()) as {
    [language: string]: {
        ids: string | string[];
        defaultExtension: string;
    }
};

// create mini-json files


// ICON DEFINITIONS
const iconsDefinition = Object.keys(icons.iconDefinitions).reduce((acc, icon) => ({
    ...acc,
    [icon]: icons.iconDefinitions[icon].iconPath.split('/').pop()
}), {});

writeFileSync(
    '../src/json/iconDefinitions.json',
    JSON.stringify(iconsDefinition, null, 2)
);

// FOLDER NAMES
const folderNames = Object.keys(icons.folderNames).reduce((acc, folderName) => ({
    ...acc,
    [folderName]: icons.folderNames[folderName]
}), {});
writeFileSync(
    '../src/json/folderNames.json',
    JSON.stringify(folderNames, null, 2)
);

// FILE EXTENSIONS
const fileExtensions = Object.keys(icons.fileExtensions).reduce((acc, fileExtension) => ({
    ...acc,
    [fileExtension]: icons.fileExtensions[fileExtension]
}), {});
writeFileSync(
    '../src/json/fileExtensions.json',
    JSON.stringify(fileExtensions, null, 2)
);

// FILE NAMES
const fileNames = Object.keys(icons.fileNames).reduce((acc, fileName) => ({
    ...acc,
    [fileName]: icons.fileNames[fileName]
}), {});
writeFileSync(
    '../src/json/fileNames.json',
    JSON.stringify(fileNames, null, 2)
);

// LANGUAGES IDS
const languagesIds = Object.keys(langauges).reduce((acc, languageId) => {
    const language = langauges[languageId];
    const langaugeIcon = {
        [language.defaultExtension]: icons.languageIds[languageId]
    };
    return {
        ...acc,
        ...langaugeIcon
    };
}, {});
writeFileSync(
    '../src/json/languagesIds.json',
    JSON.stringify(languagesIds, null, 2)
);
