/**
 * Compress build/ folder to create archive which will be consumed by browser
 */
import * as Path from 'path';
import Ch from 'chalk';
import { createWriteStream } from 'fs';
import * as Archiver from 'archiver';

const manifest = require('../build/manifest.json');
const manifestVersion = manifest.version;
const archiveName = 'github-vsci';

const log = console.log;
const filename = Path.basename(__filename);

(function () {
	log(Ch.bgYellow(`(${filename}) Creating '${archiveName}-${manifestVersion}.zip' ready to upload to stores`));
	const distZip = createWriteStream(`${process.cwd()}/dist/${archiveName}-${manifestVersion}.zip`);
	const archive = Archiver('zip', { zlib: { level: 9 } });

	// On end, print total bytes
	distZip.on('close', () => {
		log(archive.pointer() + ' total bytes');
		log(Ch.green(`> '${archiveName}-${manifestVersion}.zip' file created`));
	});

	archive.pipe(distZip);
	archive.directory('./build', false);

	archive.finalize();
})();
