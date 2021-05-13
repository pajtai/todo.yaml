import { readFile } from "fs/promises";
import {TODO_FILE_PATH} from "../constants.js";
import YAML from "yaml";

let todo = false;

export async function getTodos() {
    if (!!todo) {
        return todo;
    }
    const todoFile = await readFile(TODO_FILE_PATH, "utf-8");
    todo = YAML.parse(todoFile);
    return todo;
}

