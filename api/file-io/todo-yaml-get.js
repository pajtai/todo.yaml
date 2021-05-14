import { readFile } from "fs/promises";
import { sep } from "path";
import { CWD, TODO_FILE_NAME } from "../constants.js";
import YAML from "yaml";

let todos = false;

/**
 * Retrieve the list of todos fromt the todo file. Once it's retrieved, stor it in a singleton.
 * @returns {Promise<*|boolean>}
 */
export async function getTodos() {
    if (!!todos) {
        return todos;
    }
    const todoFile = await readFile([CWD, TODO_FILE_NAME].join(sep), "utf-8");
    todos = YAML.parse(todoFile);
    return todos;
}

