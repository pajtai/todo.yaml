import {readFile, writeFile} from "fs/promises";
import { sep } from "path";
import { CWD, TODO_FILE_NAME } from "../constants.js";
import YAML from "yaml";

/**
 * Retrieve the list of todos fromt the todo file. Once it's retrieved, stor it in a singleton.
 * @returns {Promise<*|boolean>}
 */
export async function putTodos(todosArray) {
    const todoFile = await readFile([CWD, TODO_FILE_NAME].join(sep), "utf-8");
    let todos = YAML.parse(todoFile);
    todos.todo = todosArray.filter(todo => !todo.done);
    todos.done = todos.done || [];
    todos.done = [...todos.done, ...todosArray.filter(todo => !!todo.done)];
    await writeFile([CWD, TODO_FILE_NAME].join(sep), YAML.stringify(todos));
}

