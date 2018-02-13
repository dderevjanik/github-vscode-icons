declare module "*languages-vscode.json" {
    const json: {
        [languageId: string]: {
            extensions: string[];
            filenames: string[];
        }
    };
    export default json;
}
