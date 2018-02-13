declare module "*icons.json" {
    const json: {
        iconDefinitions: { [iconKey: string]: { iconPath: string } },
        folderNames: { [folderName: string]: string }
        fileExtensions: {
            [fileExtension: string]: string;
        }
        fileNames: { [fileName: string]: string },
        languagesIds: { [languageId: string]: string },
        light: {
            folderNames: { [folderName: string]: string }
            fileExtensions: {
                [fileExtension: string]: string;
            }
            fileNames: { [fileName: string]: string },
            languagesIds: { [languageId: string]: string },
        }
    };
    export default json;
}
