import {readFile, writeFile} from 'node:fs/promises'
import { NotFoundError } from './api/error.js'

const path = 'storage/todos.json'

/**
 * @typedef {object} Todo
 * @property {Number} id
 * @property {string} title
 * @property {boolean} completed
 * 
 */

/**
 * @return {Promise<Todo[]>}.json
 */
export async function findTodos() {
    const data = await readFile(path, 'utf8')
    return JSON.parse(data)
}

/**
 * @param {string} title
 * @param {boolean} completed
 * @return {Promise<Todo>}
 */
export async function createTodo({title,completed}) {
    const todo = {title, completed, id: Date.now()}
    // const todos = await findTodos()
    const todos =  [todo, ...await findTodos()]
    //console.log(todos)
    await writeFile(path, JSON.stringify(todos,null, 2))
    return todo
}

/**
 * @param {number} id
 * @return {Promise}
 */
export async function remoteTodo(id) {
    const todos =  await findTodos()
    console.log("todos " + todos)
    const test = todos.filter(todo => todo.id === id)
    console.log("test "+test + " " + id)
    const todo = todos.findIndex(todo => todo.id === id)
    console.log("todo "+todo)
    if (todo === -1){
        throw new NotFoundError()
    }
    //console.log(todos)
    await writeFile(path, JSON.stringify(todos.filter(todo => todo.id !== id),null, 2))
    return todos
}

/**
 * @param {number} id
 * @param {{completed?: boolean, title?: string}} partialTodo
 * @return {Promise<Todo>}
 */
export async function updateTodo(id, partialTodo) {
    const todos =  await findTodos()
    console.log("todos " + todos)
     const todo = todos.find(todo => todo.id === id)
    if (todo === undefined){
        throw new NotFoundError()
    }
    Object.assign(todo, partialTodo)
    //console.log(todos)
    await writeFile(path, JSON.stringify(todos, null, 2))
    return todo
}
    
