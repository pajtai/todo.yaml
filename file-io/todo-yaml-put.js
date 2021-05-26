import { readFile, writeFile } from "fs/promises";
import { sep } from "path";
import configs from "../configs.js";
import YAML from "yaml";

let fileLocked = {};
/**
 * Retrieve the list of todos from the todo file. Once it's retrieved, stor it in a singleton.
 * @returns {Promise<void>}
 */
export async function putTodos(todosArray, file) {
    if (fileLocked[file]) {
        console.log("putTodos attempt while file locked");
        return;
    }
    fileLocked[file] = true;
    const todoFile = await readFile([configs.CWD, file].join(sep), "utf-8");
    let todos = YAML.parse(todoFile);
    todos.todo = todosArray.filter((todo) => !todo.done);
    if (todos.configuration.saveCompleted) {
        todos.done = todos.done || [];
        const done = todosArray
            .filter((todo) => !!todo.done)
            .map((todo) => {
                delete todo.done;
                return todo;
            });
        if (done) {
            todos.done = todos.done.concat(done);
        }
    }
    await writeFile([configs.CWD, file].join(sep), YAML.stringify(todos));
    fileLocked[file] = false;
}
