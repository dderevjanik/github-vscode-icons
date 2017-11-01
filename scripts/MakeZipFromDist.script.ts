import * as Path from 'path';
import { bgYellow, green } from 'chalk';
import { createWriteStream } from 'fs';
import * as Archiver from 'archiver';

const manifest = require('../build/manifest.json');
const manifestVersion = manifest.version;
const archiveName = 'github-vsci';

const log = console.log;
const filename = Path.basename(__filename);

(function () {
    log(bgYellow(`(${filename}) Creating 'github-vsci-${manifestVersion}.zip' ready to upload to stores`));
    const distZip = createWriteStream(`./dist/${archiveName}-${manifestVersion}.zip`);
    const archive = Archiver('zip', { zlib: { level: 9 } });

    distZip.on('close', () => {
        log(archive.pointer() + ' total bytes');
        log(green(`${archiveName}-${manifestVersion}.zip created`));
    });

    archive.pipe(distZip);
    archive.directory('./build', false)

    archive.finalize();
})();
