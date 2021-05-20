import { readFile } from "fs/promises";
import { TODO_FILE_PATH } from "../constants.js";
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
    const todoFile = await readFile(TODO_FILE_PATH, "utf-8");
    todos = YAML.parse(todoFile);
    return todos;
}
