import {readFile, writeFile} from "fs/promises";
import { sep } from "path";
import { CWD, TODO_FILE_NAME } from "../api/constants.js";
import YAML from "yaml";

let fileLocked = false;
/**
 * Retrieve the list of todos from the todo file. Once it's retrieved, stor it in a singleton.
 * @returns {Promise<void>}
 */
export async function putTodos(todosArray) {
    if (fileLocked) {
        console.log("putTodos attempt while file locked");
        return;
    }
    fileLocked = true;
    const todoFile = await readFile([CWD, TODO_FILE_NAME].join(sep), "utf-8");
    let todos = YAML.parse(todoFile);
    todos.todo = todosArray.filter(todo => !todo.done);
    if (todos.configuration.saveCompleted) {
        todos.done = todos.done || [];
        const done = todosArray.filter(todo => !!todo.done);
        if (done) {
            todos.done = todos.done.concat(done);
        }
    }
    await writeFile([CWD, TODO_FILE_NAME].join(sep), YAML.stringify(todos));
    fileLocked = false;
}

