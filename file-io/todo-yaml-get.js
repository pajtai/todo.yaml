import { readFile } from "fs/promises";
import configs from "../configs.js";
import { sep } from "path";
import YAML from "yaml";

export async function getTodos(fileName) {
    const todoFile = await readFile([configs.CWD, fileName].join(sep), "utf-8");
    return YAML.parse(todoFile);
}
