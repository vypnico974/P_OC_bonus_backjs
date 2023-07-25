import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

//console.log(fileURLToPath(import.meta.url));
const pathUrl = fileURLToPath(import.meta.url)

const dir = dirname(fileURLToPath(import.meta.url));
const filename = join(dir,'demo-deep.txt');
console.log(filename);

//console.log(join('a/b/', 'demo-deep.txt'))

// console.log(await readFile('demo-deep.txt'));

console.log(await readFile(filename, {encoding: 'utf8'}));
