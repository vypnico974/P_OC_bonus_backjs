import { createTodo, findTodos, remoteTodo, updateTodo } from "../todos_storage.js"
import {json} from 'node:stream/consumers'

export async function index(req,res) {
    //console.log("GET:")
    // res.write(JSON.stringify(todos)) //pour écrire les datas dans le body
    return await findTodos()
}

export async function create(req,res) {
     // const newTodo = await json(req)
      //  res.write(JSON.stringify(todo)) //pour écrire les datas dans le body
    // console.log("POST: ")
    return createTodo(await json(req))
}

export async function remove(req,res,url) {
   const id = parseInt(url.searchParams.get('id'),10)
   console.log(typeof(id))
   await remoteTodo(id)
   res.writeHead(204) //la réponse n'a pas de contenu  
}

export async function update(req,res,url) {
    const id = parseInt(url.searchParams.get('id'),10)
    return updateTodo(id, await json(req)) // pas besoin d'un await pour le retour
  
 }