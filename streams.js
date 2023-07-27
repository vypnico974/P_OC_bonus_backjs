/** tutoriel : https://grafikart.fr/tutoriels/nodejs-streams-2084#autoplay
 * Les streams permettent de gérer des flux de données avec un système de lecture 
 * ou d'écriture progressive. 
*/

/* Si par exemple on tente de copier un fichier (sans utiliser la méthode copyFile)
 on serait tenté d'écrire le code suivant. */

//  import {readFile, writeFile} from 'node:fs/promises'

// const content = await readFile('video-example-free.mp4')
// await writeFile('video-example-free-copy.mp4', content)


/* Le problème de cette approche est que l'on doit lire l'entiereté du fichier avant de commencer
 l'écriture ce qui n'est pas optimal et qui peut poser des problèmes de mémoire si le fichier 
 est trop volumineux. A la place il va être possible de créer un flux de lecture pour un fichier*/

//  import { createReadStream } from 'node:fs'

// const stream = createReadStream('video-example-free.mp4')
// stream.on('data', chunk => {
//     console.log('morceau', chunk)
// })
// stream.on('end', () => {
//     console.log('fin de la lecture')
// })

/* Ce stream permettra d'envoyer les données progressivement et de les lire morceaux par morceaux.
Il est aussi possible d'avoir des flux accessibles en écriture. */

// import { createWriteStream } from 'node:fs'

// const file = createWriteStream('example.txt')
// file.write('hello, ')
// file.end('world!') // On ne peux plus écrire après une fermeture

/*L'avantage est qu'il est possible de "synchroniser" 2 flux ensembles en envoyant les données d'un flux
 de lecture dans un flux d'écriture à l'aide de la méthode pipe. */

 import { createReadStream,createWriteStream } from 'node:fs'

const readStream = createReadStream('video-example-free.mp4')
const writeStream = createWriteStream('video-example-free-copy.mp4');
readStream.pipe(writeStream) // Le flux writeStream sera clôturé automatiquement à la fin de la lecture.

/*La synchronisation est gérée en interne et si un des flux est plus lent alors la lecture ou 
l'écriture pourra être mis en pause afin d'optimiser les performances.

Je vous ai montré ici comment utiliser ces flux dans le cas de fichiers mais c'est un type de donnée
 que l'on retrouvera dans de nombreux module de NodeJS

process.stdout et process.stderr sont des flux d'écriture permettant d'afficher des informations au niveau
 du terminal.
http.ServerResponse, l'objet permettant de représenter une réponse du serveur HTTP, sera un flux dans 
lequel on pourra écrire.
http.IncomingMessage, l'objet qui représentera une requête entrante dans le cas d'un serveur HTTP
 sera un flux accessible en lecture. */