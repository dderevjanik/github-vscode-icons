import * as Path from 'path';
import * as Ch from 'chalk';

const log = console.log;

export async function script(filename: string, desc: string, callback: (tools: { log: Console['log'], Ch: typeof Ch }, exit: (error?: any) => void) => Promise<void> | void) {
    const baseName = Path.basename(filename);
    log(Ch.bgYellow(`(${baseName}) ${desc}`));
    const sTime = Date.now();
    try {
        callback({ log, Ch }, (error?: any) => {
            const diff = Date.now() - sTime;
            if (error) {
                console.log(`Execution time: ${Ch.bgRed(diff.toString() + 'ms')}`);
            } else {
                console.log(`Execution time: ${Ch.bgGreen(diff.toString() + 'ms')}`);
            }
        });
    } catch (error) {
        const diff = Date.now() - sTime;
        console.log(`Execution time: ${Ch.bgRed(diff.toString() + 'ms')}`);
    }
}
