/**tutoriel : https://grafikart.fr/tutoriels/nodejs-child-process-2086#autoplay
 * 
 * Process enfant
 *  */ 

/* Dans ce chapitre nous allons voir l'objet process qui nous permet d'intéragir avec le process
 NodeJS courant. On a sur cet objet 3 propriété qui permettent de communiquer avec le système.

stdin est un flux de lecture connecté au "standard input" qui recevra les données envoyées au terminal.
stdout est un flux d'écriture connecté au "standard output"
stderr est un flux d'écriture connecté au "standard error"
Par exemple, pour afficher tout ce qui est rentré dans le terminal.*/

// import { stdin, stdout } from 'node:process'

// stdin.pipe(stdout) 

/* Aussi, il sera possible de récupérer les arguments passé à la commande à l'aide de argv 
(un tableau de chaîne de caractère).

En plus de contrôler le processus principal on aura la possibilité de créer des processus enfants. 
La méthode exec permet d'éxécuter un processus enfant et de recevoir le retour du stdout et stderr.*/

// const { exec } = require('node:child_process')

// exec('ls -lah', (error, out, err) => {
//     console.log(out)
// })

/* La méthode spawn permet de créer un processus enfant et de récupérer la sortie sous forme de flux. */
import { spawn } from 'node:child_process'

const ls = spawn('ls', ['-lah', '/usr'])

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
})

ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
})

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
})