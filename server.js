/** tutoriels : https://grafikart.fr/tutoriels/nodejs-http-2085#autoplay
 * Notre premier serveur web
 */

// import {createServer} from 'node:http';

// const server = createServer((req, res) => {
//     res.write('Hello')
//     res.end()

//     }
// )
// server.listen(8888);


// import { createReadStream } from 'node:fs';
// import {createServer} from 'node:http';

// const server = createServer((req, res) => {
//         console.log(req);
//         const file = createReadStream('index.html');
//         //writeHead permet de définir un code de status et les en têtes
//         res.writeHead('200', {
//             'Content-Type':'text/html'

//         });
//         file.pipe(res, {end:false});
//         file.on('end', () => {
//             res.end()
//             });

//     }
// )
// server.listen(8888);


/* La méthode createServer permettra de créer un serveur web qui recevra des événements dont notamment
 l'évènement request qui sera reçu lorsque une requête sera reçue.*/

 import { createServer } from 'node:http'

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({message: 'bonjour'}))
})
server.listen(8888)

/* Lors de l'événement request on recevra 2 objets représentant respectivement la requête et la réponse. 
Sur l'objet request on peut récupérer les en-têtes avec la propriété headers.*/

// req.headers.accept
// req.headers.host
// req.headers['user-agent']

/* Pour récupérer les informations concernant l'URL, on pourra utiliser un objet URL. */

// const url = new URL(req.url, `http://${req.headers.host}`)
// url.pathname // récupère le chemin
// url.searchParams // Objet pour récupérer les query params (?id=...)

/* Enfin, l'objet request est un flux que l'on pourra lire comme un flux classique ou avec des méthodes
 du streamConsulers */
//  import {json, text} from 'node:stream/consumers'

//  const data = await json(req) // Pour du json
//  const data = await text(req) // Pour du texte