import { readFile } from "fs/promises";
import { sep } from "path";
import { CWD, TODO_FILE_NAME } from "../api/constants.js";
import YAML from "yaml";

/**
 * Retrieve the list of todos fromt the todo file. Once it's retrieved, stor it in a singleton.
 * @returns {Promise<*|boolean>}
 */
export async function getTodos() {
    const todoFile = await readFile([CWD, TODO_FILE_NAME].join(sep), "utf-8");
    const todos = YAML.parse(todoFile);
    return todos.todo || [];
}

export async function getEntireTodosObject() {
    const todoFile = await readFile([CWD, TODO_FILE_NAME].join(sep), "utf-8");
    return YAML.parse(todoFile);
}
