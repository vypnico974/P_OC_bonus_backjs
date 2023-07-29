import {createServer} from 'node:http';
import { create, index, remove, update } from '../demo/functions/api/todo.js';
import { NotFoundError } from '../demo/functions/api/error.js';
import { createReadStream } from 'node:fs';

createServer(async (req,res) => {
    try { 
        console.log("start")
        res.setHeader('Content-Type', 'application/json')
        const url = new URL(req.url, `http://${req.headers.host}`)
        // console.log(url)
        const endpoint = `${req.method}:${url.pathname}`
        console.log("endpoint: "+endpoint)
        console.log("start2")
        let results
        switch (endpoint) {
            case 'GET:/':
                res.setHeader('Content-Type', 'text/html')
                createReadStream('index.html').pipe(res)
                return
            case 'GET:/todos':
                   results = await index(req,res)
                break;
            case 'POST:/todos':
                   results = await create(req,res)
                break;
            case 'DELETE:/todos':
                  results =  await remove(req,res,url)
                break;
            case 'PUT:/todos':
                  results =  await update(req,res,url)
                break;
        
            default:
                console.log("endpoint: "+endpoint)
            // console.log('404')
                res.writeHead('404', {
                    'Content-Type':'text/html'
        
                });
                res.write('erreurrrr 404')
                break;
        }
        console.log("resultat: " + results)
        if (results) {
            res.write(JSON.stringify(results))
    }} catch (e) {
        if(e instanceof NotFoundError){
            res.write('erreuryyy 404')
        } else {
            throw e
        }
    }
   
    res.end() //fermer la réponse 
   
}).listen(3000)