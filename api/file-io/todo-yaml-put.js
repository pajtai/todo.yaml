import {readFile, writeFile} from "fs/promises";
import { sep } from "path";
import { CWD, TODO_FILE_NAME } from "../constants.js";
import YAML from "yaml";

let busy = false;
/**
 * Retrieve the list of todos fromt the todo file. Once it's retrieved, stor it in a singleton.
 * @returns {Promise<*|boolean>}
 */
export async function putTodos(todosArray) {
    if (busy) {
        return;
    }
    busy = true;
    const todoFile = await readFile([CWD, TODO_FILE_NAME].join(sep), "utf-8");
    let todos = YAML.parse(todoFile);
    todos.todo = todosArray.filter(todo => !todo.done);
    if (todos.configuration.saveTodos) {
        todos.done = todos.done || [];
        const done = todosArray.filter(todo => !!todo.done);
        if (done) {
            todos.done = todos.done.concat(done);
        }
    }
    console.log("0--");
    console.log(todos);
    console.log(YAML.stringify(todos));
    await writeFile([CWD, TODO_FILE_NAME].join(sep), YAML.stringify(todos));
    busy = false;
}

