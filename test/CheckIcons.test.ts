type NAME_TO_ICON = { [name: string]: string };
import { existsSync } from 'fs';

const folderNamesToIcon = require('../packages/content/data/FolderNamesToIcon.json') as NAME_TO_ICON;
const fileExtensions1ToIcon = require('../packages/content/data/FileExtensions1ToIcon.json') as NAME_TO_ICON;
const fileExtensions2ToIcon = require('../packages/content/data/FileExtensions2ToIcon.json') as NAME_TO_ICON;
const fileNamesToIcon = require('../packages/content/data/FileNamesToIcon.json') as NAME_TO_ICON;
const languagesToIcon = require('../packages/content/data/LanguagesToIcon.json') as NAME_TO_ICON;
const PBSyntaxesToIcon = require('../packages/content/data/PastebinSyntaxesToIcon.json') as NAME_TO_ICON;

describe('Check if all icon files exists on disk', () => {

    it('should check if all icon files described in FolderNamesToIcon.json exists', () => {
        const folderNames = Object.keys(folderNamesToIcon);
        folderNames.forEach((folderName) => {
            const icon = folderNamesToIcon[folderName];
            const iconExists = existsSync(`./build/icons/${icon}`);
            if (!iconExists) {
                throw Error(`"./build/icons/${icon}" doesn't exists for folder with name '${folderName}'`);
            }
        });
    });

    it('should check if all icon files described in FileExtension1.json and FileExtension2.json exists', () => {
        const allExtensions = Object.assign(fileExtensions1ToIcon, fileExtensions2ToIcon);
        const extensions = Object.keys(allExtensions);
        extensions.forEach((extension) => {
            const icon = allExtensions[extension];
            const iconExists = existsSync(`./build/icons/${icon}`);
            if (!iconExists) {
                throw Error(`"./build/icons/${icon}" doesn't exists for extension '.${extension}'`);
            }
        });
    });

    it('should check if all icon files described in FileNamesToIcon.json exists', () => {
        const filenames = Object.keys(fileNamesToIcon);
        filenames.forEach((name) => {
            const icon = fileNamesToIcon[name];
            const iconExists = existsSync(`./build/icons/${icon}`);
            if (!iconExists) {
                throw Error(`"./build/icons/${icon}" doesn't exists for special filename '${name}'`);
            }
        });
    });

    it('should check if all icon files described in languagesToIcon.json exists', () => {
        const languages = Object.keys(languagesToIcon);
        languages.forEach((language) => {
            const icon = languagesToIcon[language];
            const iconExists = existsSync(`./build/icons/${icon}`);
            if (!iconExists) {
                throw Error(`"./build/icons/${icon}" doesn't exists for language '${language}'`);
            }
        });
    });

    it('should check if all icon files described in PBSyntaxesToIcon.json exists', () => {
        const syntaxes = Object.keys(PBSyntaxesToIcon);
        syntaxes.forEach((syntax) => {
            const icon = PBSyntaxesToIcon[syntax];
            const iconExists = existsSync(`./build/icons/${icon}`);
            if (!iconExists) {
                throw Error(`"./build/icons/${icon}" doesn't exists for language '${syntax}'`);
            }
        });
    });

});

