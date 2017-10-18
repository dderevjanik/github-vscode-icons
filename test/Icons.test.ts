import { getIconForFile, getIconForFolder, getIconForOpenFolder } from '../src/Icons';

describe('Icons test', () => {

    describe('files', () => {

        it('should return icons by special filenames', () => {
            expect([
                getIconForFile('manifest.bak'),
                getIconForFile('.nvmrc'),
                getIconForFile('phpunit'),
                getIconForFile('phpunit.xml.dist'),
                getIconForFile('rollup.config.js'),
                getIconForFile('tsconfig.json'),
                getIconForFile('tsconfig.spec.json'),
                getIconForFile('webpack.base.conf.js'),
                getIconForFile('.eslintrc.yaml')
            ]).toEqual([
                'file_type_manifest_bak.svg',
                'file_type_node.svg',
                'file_type_phpunit.svg',
                'file_type_phpunit.svg',
                'file_type_rollup.svg',
                'file_type_tsconfig.svg',
                'file_type_tsconfig.svg',
                'file_type_webpack.svg',
                'file_type_eslint.svg',
            ]);
        });

        it('should return icons by extensions', () => {
            expect([
                getIconForFile('All.test.ts'),
                getIconForFile('All.test.tsx'),
                getIconForFile('package.nls.de.json'),
                getIconForFile('content.js.map')
            ]).toEqual([
                'file_type_testts.svg',
                'file_type_testts.svg',
                'file_type_light_json.svg',
                'file_type_light_jsmap.svg',
            ]);
        });

        it('should return icons by languages', () => {
            expect([
                getIconForFile('content.js'),
                getIconForFile('Index.script.ts'),
                getIconForFile('__main__.py')
            ]).toEqual([
                'file_type_light_js.svg',
                'file_type_typescript.svg',
                'file_type_python.svg',
            ]);
        });

    });

    describe('folders', () => {

        it('should return icons for folders', () => {
            expect([
                getIconForFolder('images'),
                getIconForFolder('src'),
                getIconForFolder('locale')
            ]).toEqual([
                'folder_type_images.svg',
                'folder_type_src.svg',
                'folder_type_locale.svg',
            ]);
        });

        it('should return icons for opened folders', () => {
            expect([
                getIconForOpenFolder('images'),
                getIconForOpenFolder('src'),
                getIconForOpenFolder('locale')
            ]).toEqual([
                'folder_type_images_opened.svg',
                'folder_type_src_opened.svg',
                'folder_type_locale_opened.svg',
            ]);
        });

    });

});
