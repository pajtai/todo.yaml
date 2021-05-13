import { readFile } from "fs/promises";
import {TODO_FILE_PATH} from "../constants.js";
import YAML from "yaml";

const todoFile = await readFile(TODO_FILE_PATH, "utf-8");
export const todo = YAML.parse(todoFile);
