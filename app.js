/** https://devdocs.io/  doc pour les propriétés utilisées
 * 
 * 
 * 
 */


// import { isUtf8 } from 'node:buffer';
// import { promises } from 'node:dns';
// import { copyFile, unlink, write } from 'node:fs';
// import fs from 'node:fs';
// import {readFile, writeFile, stat, open, watch} from 'node:fs/promises';

// const watcher = watch('./')
// for await(const event of watcher){
//     console.log(event);
// }
// //const content = fs.readFileSync('./demo.txt',{encoding: 'utf8'})
// const content = fs.readFile('./demo.txt',{encoding: 'utf8'}, function (err,content){
//     console.log(content);
// });

// const content = await writeFile('demo.txt', 'Bonjour les gens',{flag:'a'})
// await copyFile()
// await unlink()
//const i = stat('demo.txt');
// const file = await open('demo.txt', 'a');
// file.write('rajout1')

// file.close();

// const content = await Promise.all([
// readFile('./demo.txt',{encoding: 'utf8'}),
// readFile('./app.js',{encoding: 'utf8'})])
//console.log(i);
// console.log('Hello');  



import { readdir, stat } from "node:fs/promises";

const wait = (duration) => new Promise(resolve => setTimeout(resolve,duration));

console.time('code');

const files = await readdir('./',{withFileTypes:true});
await Promise.allSettled(
    files.map(async (file) => {
        const parts = [
                    file.isDirectory() ? 'D' : 'F',
                    file.name
                ];
                if (!file.isDirectory()){
                    const {size} = await stat(file.name);
                    // const size = await wait(1000);
                    parts.push(`${size}o`);
                }
        console.log(parts.join(' - '));

    })
)
// for (const file of files){
//     const parts = [
//         file.isDirectory() ? 'D' : 'F',
//         file.name
//     ];
//     if (!file.isDirectory()){
//         // const {size} = await stat(file.name);
//         const size = await wait(1000);
//         parts.push(`${size}o`);
//     }
    
//     console.log(parts.join(' - '));
// }
// console.log(files);
console.timeEnd('code');